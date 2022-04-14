import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessageModel } from 'src/chat/models/message.model';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatModel } from './models/chat.model';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [SequelizeModule.forFeature([MessageModel, ChatModel])],
})
export class ChatModule {}
