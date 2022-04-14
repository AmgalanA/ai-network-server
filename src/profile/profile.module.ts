import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileModel } from './models/profile.model';
import { AuthModel } from 'src/auth/models/auth.model';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SequelizeModule.forFeature([ProfileModel, AuthModel]),
    FileModule,
    AuthModule,
  ],
})
export class ProfileModule {}
