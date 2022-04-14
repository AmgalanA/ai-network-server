import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatModel } from 'src/chat/models/chat.model';
import { ProfileModel } from 'src/profile/models/profile.model';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [SequelizeModule.forFeature([ProfileModel, ChatModel])],
})
export class MessageModule {}
