import { Controller, Get } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { Chatroom } from 'src/entities/chatroom.entity';

@Controller('chatroom')
export class ChatroomController {
    constructor(private readonly chatroomService: ChatroomService) {}

    /*
    @Get()
    async findAll(): Promise<Chatroom[]> {
        return this.chatroomService.findAll();
    }
        */
}
