import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';
import { createCommentDto } from './dtos/create-comment.dto';
import { createMusicDto } from './dtos/create-music.dto';
import { MusicCommentModel } from './models/music-comment.model';
import { MusicModel } from './models/music.model';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(MusicModel) private musicRepository: typeof MusicModel,
    @InjectModel(MusicCommentModel)
    private musicCommentRepository: typeof MusicCommentModel,
    private fileService: FileService,
  ) {}

  async create(
    picture: Express.Multer.File,
    audio: Express.Multer.File,
    musicDto: createMusicDto,
  ) {
    const audioFile = this.fileService.createFile(audio, FileType.AUDIO);
    const pictureFile = this.fileService.createFile(
      picture,
      FileType.AUDIOPICTURE,
    );

    const createdAt = new Date(Date.now()).getTime().toString();
    const music = await this.musicRepository.create({
      ...musicDto,
      name: musicDto.name[0],
      createdAt,
      audio: audioFile,
      picture: pictureFile,
    });

    return music;
  }

  async getAll(limit: number) {
    const musics = await this.musicRepository.findAll({
      limit,
      include: { all: true },
      order: [['id', 'DESC']],
    });
    return musics;
  }

  async getOne(id: number) {
    const music = await this.musicRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return music;
  }

  async listen(id: number) {
    const music = await this.getOne(id);
    music.listens += 1;
    return music;
  }

  async delete(id: number) {
    const music = await this.musicRepository.destroy({ where: { id } });
    return music;
  }

  async sendComment(commentDto: createCommentDto, musicId: number) {
    const music = await this.musicRepository.findOne({
      where: { id: musicId },
      include: { all: true },
    });
    const sentAt = new Date(Date.now()).getTime().toString();

    const comment = await this.musicCommentRepository.create({
      ...commentDto,
      sentAt,
    });

    comment.musicId = music.id;
    await comment.save();

    await music.$add('comments', comment);

    return comment;
  }

  async search(query: string) {
    const musics = await this.musicRepository.findAll();
    console.log(musics);
    const filteredMusics = musics.filter(
      (music) =>
        music.name.toLowerCase().trim().includes(query.toLowerCase().trim()) ||
        music.description
          .toLowerCase()
          .trim()
          .includes(query.toLowerCase().trim()),
    );

    return filteredMusics;
  }
}
