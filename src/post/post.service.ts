import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FileService, FileType } from 'src/file/file.service';
import { createCommentDto } from './dtos/create-comment.dto';

import { createPostDto } from './dtos/create-post.dto';
import { CommentModel } from './models/comment.model';
import { PostModel } from './models/post.model';

@Injectable()
export class PostService {
  constructor(
    private fileService: FileService,
    @InjectModel(PostModel) private postRepository: typeof PostModel,
    @InjectModel(CommentModel) private CommentRepository: typeof CommentModel,
  ) {}

  async create(postDto: createPostDto, image: Express.Multer.File) {
    const fileName = this.fileService.createFile(image, FileType.POSTIMAGE);
    const postedAt = new Date(Date.now()).getTime();

    const post = await this.postRepository.create({
      ...postDto,
      postedAt,
      imageUrl: fileName,
    });

    return {
      post,
    };
  }

  async getAll() {
    const posts = await this.postRepository.findAll({
      include: { all: true },
      order: [['createdAt', 'DESC']],
    });

    return { posts };
  }

  async getOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return { post };
  }

  async getSpecificPosts(creatorId: number) {
    const posts = await this.postRepository.findAll({ where: { creatorId } });

    return posts;
  }

  async sendComment(postId: number, commentDto: createCommentDto) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    const sentAt = new Date(Date.now()).getTime();

    const comment = await this.CommentRepository.create({
      ...commentDto,
      sentAt,
      postId,
    });

    await post.$add('comments', comment);

    return comment;
  }

  async search(query: string) {
    const posts = await this.postRepository.findAll();
    const filteredPosts = posts.filter(
      (post) =>
        post.text.toLowerCase().trim().includes(query.trim().toLowerCase()) ||
        post.title.toLowerCase().trim().includes(query.trim().toLowerCase()),
    );

    return filteredPosts;
  }
}
