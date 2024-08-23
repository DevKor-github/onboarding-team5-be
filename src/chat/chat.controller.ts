import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatRoomDto } from './dtos/createChatRoom.dto';
import { Docs } from 'src/decorators/docs/chat.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatSerivce: ChatService) {}
  
  @UseGuards(AuthGuard('jwt-access'))
  @Get('list')
  @Docs('list')
  async getChatRoomsForUser(@Request() req) {
    const id = req.user.id;
    const chatRooms = await this.chatSerivce.getChatRoomsForUser(id);

    return chatRooms;
  }

}
