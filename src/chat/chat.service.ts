import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { User } from 'src/entities/user.entity';
import { Repository, In } from 'typeorm';
import { CreateChatRoomDto } from './dtos/createChatRoom.dto';
import { Message } from 'src/entities/message.entity';
import { SendMessageDto } from './dtos/sendMessage.dto';
import { Socket } from 'socket.io';
import { UserSocket } from 'src/entities/userSocket.entity';
import { LeaveChatRoomDto } from './dtos/leaveChatRoom.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(UserSocket)
    private userSocketRepository: Repository<UserSocket>,
  ) { }

  async userSocketConnection(client: Socket):Promise<void> {
    const userIdString = client.handshake.query.userId as string;
    if (!userIdString) throw new NotFoundException("사용자 ID가 없습니다.");
    const userId = parseInt(userIdString, 10);
    const socketId = client.id;
    const userSocket = this.userSocketRepository.create({
      userId,
      socketId
    });
    await this.userSocketRepository.save(userSocket);

    const chatRooms = await this.getChatRoomsForUser(userId);
    for (const chatRoom of chatRooms) {
      client.join(`room-${chatRoom.id}`);
      client.emit('joinedChatRoom', { success: true, chatRoomId: chatRoom.id });
    }
  }

  async userSocketDisconnection(client: Socket): Promise<void> {
    const socketId = client.id;
    const userSocket = this.userSocketRepository.findOne({ where: { socketId } });
    if (!userSocket) throw new NotFoundException("서버에 존재하지 않는 사용자 입니다.");
    await this.userSocketRepository.delete({ socketId });
  }

  async createChatRoom(createChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
    const { name, userIds } = createChatRoomDto;

    if (userIds.length < 2) {
      throw new Error('채팅방 최소 인원은 2명 입니다.');
    }

    userIds.sort();
    const users = await this.userRepository.findBy({ id: In(userIds) });

    if (users.length !== userIds.length) {
      throw new Error('존재하지 않는 사용자는 채팅방에 초대할 수 없습니다.');
    }

    const targetUser = users[0];
    const targetChatRooms = await this.chatRoomRepository.find({
      where: { id: In(targetUser.chatRooms.map(room => room.id)) },
      relations: ['users', 'messages']
    });

    for (const room of targetChatRooms) {
      if (room.userCounts !== userIds.length) continue;
      const targetUserIds = room.users.map(user => user.id);
      if (JSON.stringify(targetUserIds) === JSON.stringify(userIds)) {
        return room;
      }
    }

    const chatRoom = this.chatRoomRepository.create({
      name: name,
      users: users,
      userCounts: userIds.length
    });

    return await this.chatRoomRepository.save(chatRoom);
  }

  async leaveChatRoom(leaveChatRoomDto: LeaveChatRoomDto, client: Socket): Promise<void> {
    const { userId, chatRoomId } = leaveChatRoomDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");

    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: chatRoomId },
      relations: ['users', 'messages'],
    });
    if (!chatRoom) throw new NotFoundException("존재하지 않는 채팅방 입니다.");
    const checkUser = chatRoom.users.findIndex((u) => u.id === userId);
    if (checkUser === -1) throw new NotFoundException("해당 사용자는 채팅방에 존재하지 않습니다.");

    chatRoom.users.splice(checkUser, 1);
    await this.chatRoomRepository.save(chatRoom);
    client.leave(`room-${chatRoom.id}`);

    if (chatRoom.users.length === 0) await this.chatRoomRepository.remove(chatRoom);
  }

  async saveMessage(sendMessageDto: SendMessageDto): Promise<Message> {
    const { chatRoomId, senderId, message } = sendMessageDto;
    const chatRoom = await this.chatRoomRepository.findOne({ where: { id: chatRoomId } });
    const sender = await this.userRepository.findOne({ where: { id: senderId } });

    const newMessage = this.messageRepository.create({ chatRoom, sender, content: message, createdAt: new Date() });
    return await this.messageRepository.save(newMessage);
  }

  async reconnectChatRoom(reconnectChatRoomDto: LeaveChatRoomDto): Promise<any> {
    const { userId, chatRoomId } = reconnectChatRoomDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const chatRoomIndex = user.chatRooms.findIndex((room) => room.id === chatRoomId);
    if (chatRoomIndex === -1) throw new NotFoundException("해당 채팅방에 참여하지 않은 사용자 입니다.");

    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: chatRoomId },
      relations: ['messages'],
      select: ['messages']
    });
    if (!chatRoom) throw new NotFoundException("존재하지 않는 채팅방입니다.");

    return chatRoom;
  }

 /* 
  async getChatHistory(chatRoomId: number): Promise<Message[]> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: chatRoomId },
      relations: ['messages']
    });
    if (!chatRoom) throw new NotFoundException("존재하지 않는 채팅방입니다.");

    const messages = chatRoom.messages;

    return messages;
  }
  */
  

  async getUsersInChatRoom(chatRoomId: number): Promise<Partial<User>[]> {
    const users = await this.userRepository
    .createQueryBuilder('user')
    .leftJoin('user.chatRooms', 'chatRoom') // Join with chatRooms
    .where('chatRoom.id = :chatRoomId', { chatRoomId })
    .select(['user.id', 'user.name']) // Only select the 'id' field
    .getMany();

    return users;
  }

  async getChatRoomsForUser(id: number): Promise<any[]> {
    return this.chatRoomRepository.createQueryBuilder('chatRoom')
      .select(['chatRoom.id', 'chatRoom.name', 'chatRoom.updatedAt'])
      .innerJoin('chatRoom.users', 'user')
      .where('user.id = :id', { id: id })
      .getMany();
  }
}
