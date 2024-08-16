import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { User } from 'src/entities/user.entity';
import { Repository, In } from 'typeorm';
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
      const { name, userIds } = createChatRoomDto;
      const users = await this.userRepository.findBy({ id: In(userIds) });

      if (users.length < 2) {
        throw new Error('채팅방 최소 인원은 2명 입니다.');
      }
      if (users.length !== userIds.length) {
        throw new Error('존재하지 않는 사용자는 채팅방에 초대할 수 없습니다.');
      }

      const chatRoom = this.chatRoomRepository.create({
        name: name,
        users: users
      });
      return this.chatRoomRepository.save(chatRoom);
  }

  async getChatRoomsForUser(id: number): Promise<any[]> {
    return this.chatRoomRepository.createQueryBuilder('chatRoom')
      .select(['chatRoom.id', 'chatRoom.name', 'chatRoom.updatedAt'])
      .innerJoin('chatRoom.users', 'user')
      .where('user.id = :id', { id: id })
      .getMany();
  }
}
