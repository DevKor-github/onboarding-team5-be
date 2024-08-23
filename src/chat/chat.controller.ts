import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { Docs } from 'src/decorators/docs/chat.decorator';
import { Message } from 'src/entities/message.entity';

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

  @Get('history/:chatRoomId')
  @Docs('list')
  async getChatHistory(@Param('chatRoomId') chatRoomId: number): Promise<Partial<Message>[]> {
    const chatHistory = await this.chatSerivce.getChatHistory(chatRoomId);

    return chatHistory;
  }

}
