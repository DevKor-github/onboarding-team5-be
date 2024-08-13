import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChatRoomDto } from './dtos/createChatRoom.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatRoom)
        private chatRoomRepository: Repository<ChatRoom>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createChatRoom(createChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
        const chatRoom = this.chatRoomRepository.create(createChatRoomDto);
        return this.chatRoomRepository.save(chatRoom);
    }

  async getChatRoomsForUser(id: number): Promise<ChatRoom[]> {
    return this.chatRoomRepository.createQueryBuilder('chatroom')
      .leftJoinAndSelect('chatroom.users', 'user')
      .where('user.id = :id', { id })
      .getMany();
   }
}
