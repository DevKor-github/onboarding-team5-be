import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket, Server } from 'socket.io';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { Repository, In } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateChatRoomDto } from './dtos/createChatRoom.dto';
import { ChatService } from './chat.service';
import { Docs } from 'src/decorators/docs/chat.decorator';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly chatService: ChatService
  ) {}

  afterInit(server: Server) {
    console.log("서버 시작")
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('create-chat-room')
  @Docs('create-chat-room')
  async createChatRoom(@MessageBody() createChatRoomDto: CreateChatRoomDto, @ConnectedSocket() client: Socket) {
    const chatRoom = await this.chatService.createChatRoom(createChatRoomDto);
    client.emit('chatRoomCreated', chatRoom);

    return chatRoom;
  }
}
