import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { or } from 'sequelize/types';
import { createChatDto } from './dto/create-chat.dto';
import { createMessageDto } from './dto/create-message.dto';
import { ChatModel } from './models/chat.model';
import { MessageModel } from './models/message.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatModel) private chatRepository: typeof ChatModel,
    @InjectModel(MessageModel) private messageRepository: typeof MessageModel,
  ) {}

  async create(chatDto: createChatDto) {
    const chatCandidate = await this.chatRepository.findOne({
      where: {
        [Op.or]: [
          {
            firstProfileId: chatDto.firstProfileId,
            secondProfileId: chatDto.secondProfileId,
          },
          {
            firstProfileId: chatDto.secondProfileId,
            secondProfileId: chatDto.firstProfileId,
          },
        ],
      },
    });
    if (chatCandidate) return chatCandidate;

    const chat = await this.chatRepository.create(chatDto);
    return chat;
  }

  async delete(id: number) {
    const chat = await this.chatRepository.destroy({ where: { id } });
    return chat;
  }

  async sendMessage(messageDto: createMessageDto) {
    const sentAt = new Date(Date.now()).getTime().toString();

    const chat = await this.chatRepository.findOne({
      where: { id: messageDto.chatId },
      include: { all: true },
    });

    const message = await this.messageRepository.create({
      text: messageDto.text,
      sentAt,
      senderId: messageDto.senderId,
      chatId: messageDto.chatId,
    });

    chat.$add('messages', message);

    return message;
  }

  async getChat(id: number) {
    const chat = await this.chatRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return chat;
  }

  async getChats(profileId: number) {
    const chats = await this.chatRepository.findAll({
      where: {
        [Op.or]: {
          firstProfileId: profileId,
          secondProfileId: profileId,
        },
      },
      include: { all: true },
    });

    return chats;
  }

  async getChatsByProfiles(profileIds: {
    firstProfileId: number;
    secondProfileId: number;
  }) {
    const chatCandidate = await this.chatRepository.findOne({
      where: {
        firstProfileId: profileIds.firstProfileId,
        secondProfileId: profileIds.secondProfileId,
      },
      include: { all: true },
    });
    if (!chatCandidate) {
      const chat = await this.chatRepository.findOne({
        where: {
          firstProfileId: profileIds.secondProfileId,
          secondProfileId: profileIds.firstProfileId,
        },
        include: { all: true },
      });
      return chat;
    }
    return chatCandidate;
  }
}
