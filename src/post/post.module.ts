import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from 'src/file/file.module';
import { ProfileModel } from 'src/profile/models/profile.model';
import { CommentModel } from './models/comment.model';
import { PostModel } from './models/post.model';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    SequelizeModule.forFeature([ProfileModel, PostModel, CommentModel]),
    FileModule,
  ],
  exports: [PostService],
})
export class PostModule {}
