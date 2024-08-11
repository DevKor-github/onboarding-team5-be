import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatroom } from 'src/entities/chatroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatroomService {
    constructor (
        @InjectRepository(Chatroom)
        private chatroomRepository : Repository<Chatroom>
    ) {}

    // 채팅방 목록 전체 조회
    /*
    async findAll(): Promise<Chatroom[]> {
        return await this.chatroomRepository.find();
    }
    */

    // 
}
