import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from 'src/file/file.module';
import { ProfileModel } from 'src/profile/models/profile.model';
import { MusicCommentModel } from './models/music-comment.model';
import { MusicModel } from './models/music.model';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  controllers: [MusicController],
  providers: [MusicService],
  imports: [
    SequelizeModule.forFeature([MusicModel, ProfileModel, MusicCommentModel]),
    FileModule,
  ],
})
export class MusicModule {}
