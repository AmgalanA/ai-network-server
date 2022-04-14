import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { createChatDto } from './dto/create-chat.dto';
import { createMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('/create')
  create(@Body() chatDto: createChatDto) {
    return this.chatService.create(chatDto);
  }

  @Post('/delete')
  delete(@Body() id: number) {
    return this.chatService.delete(id);
  }

  @Post('/send-message')
  sendMessage(@Body() messageDto: createMessageDto) {
    return this.chatService.sendMessage(messageDto);
  }

  @Get('/get-chat/:id')
  getChat(@Param('id') id: number) {
    return this.chatService.getChat(id);
  }

  @Get('/get-chats/:profileId')
  getChats(@Param('profileId') profileId: number) {
    return this.chatService.getChats(profileId);
  }

  @Post('/get-chat-by-profiles')
  getChatsByProfiles(
    @Body() profileIds: { firstProfileId: number; secondProfileId: number },
  ) {
    return this.chatService.getChatsByProfiles(profileIds);
  }
}
