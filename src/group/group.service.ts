import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';
import { createPostDto } from 'src/post/dtos/create-post.dto';
import { PostService } from 'src/post/post.service';
import { ProfileService } from 'src/profile/profile.service';
import { GroupDto } from './dtos/group.dto';
import { GroupModel } from './models/group.model';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(GroupModel) private groupRepository: typeof GroupModel,
    private profileService: ProfileService,
    private fileService: FileService,
    private postService: PostService,
  ) {}

  async create(image: Express.Multer.File, groupDto: GroupDto) {
    const createdAt = new Date(Date.now()).getTime().toString();

    const imageUrl = this.fileService.createFile(image, FileType.GROUPIMAGE);

    const group = await this.groupRepository.create({
      ...groupDto,
      imageUrl,
      createdAt,
    });

    return group;
  }

  async getAll() {
    const groups = await this.groupRepository.findAll({
      include: { all: true },
      order: [['id', 'DESC']],
    });
    return groups;
  }

  async getOne(id: string) {
    const group = await this.groupRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return group;
  }

  async addMember(id: string, profileId: string) {
    const profile = await this.profileService.getById(profileId);
    const group = await this.groupRepository.findOne({
      where: { id },
      include: { all: true },
    });

    await group.$add('members', profile);
    return group;
  }

  async getByCreator(creatorId: string) {
    const groups = await this.groupRepository.findAll({
      where: { creatorId },
      include: { all: true },
    });
    return groups;
  }

  async createPost(
    groupId: string,
    postDto: createPostDto,
    image: Express.Multer.File,
  ) {
    const { post } = await this.postService.create(postDto, image);

    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      include: { all: true },
    });

    post.groupId = group.id;

    await post.save();

    // await group.$add('posts', post);
    await group.$set('posts', [...group.posts, post]);

    return group;
  }
}
