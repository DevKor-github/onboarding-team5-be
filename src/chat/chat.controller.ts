import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatRoomDto } from './dtos/createChatRoom.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatSerivce: ChatService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Post('create')
  async createChatRoom(@Request() req, @Body() createChatRoomDto: CreateChatRoomDto) {
    const id = req.user.id;
    const chatRoom = await this.chatSerivce.createChatRoom(createChatRoomDto);

    return chatRoom;
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('list')
  async getChatRoomsForUser(@Request() req) {
    const id = req.user.id;
    const chatRooms = await this.chatSerivce.getChatRoomsForUser(id);

    return chatRooms;
  }

}
