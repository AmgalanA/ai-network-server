import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from 'src/file/file.module';
import { PostModel } from 'src/post/models/post.model';
import { PostModule } from 'src/post/post.module';
import { ProfileModel } from 'src/profile/models/profile.model';
import { ProfileModule } from 'src/profile/profile.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupModel } from './models/group.model';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [
    SequelizeModule.forFeature([ProfileModel, GroupModel, PostModel]),
    ProfileModule,
    FileModule,
    PostModule,
  ],
})
export class GroupModule {}
