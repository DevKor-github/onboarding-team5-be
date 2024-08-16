import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket, Server } from 'socket.io';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { Repository, In } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateChatRoomDto } from './dtos/createChatRoom.dto';
import { ChatService } from './chat.service';
import { Docs } from 'src/decorators/docs/chat.decorator';
import { SendMessageDto } from 'src/user/dtos/sendMessage.dto';

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

  @SubscribeMessage('createChatRoom')
  @Docs('createChatRoom')
  async createChatRoom(@MessageBody() createChatRoomDto: CreateChatRoomDto, @ConnectedSocket() client: Socket) {
    const chatRoom = await this.chatService.createChatRoom(createChatRoomDto);
    client.emit('chatRoomCreated', chatRoom);

    return chatRoom;
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() sendMessageDto: SendMessageDto, @ConnectedSocket() client: Socket) {
    const { chatRoomId, message } = sendMessageDto;
    const saveMessage = await this.chatService.saveMessage(chatRoomId, client.id, message);

    this.server.to(`room-${chatRoomId}`).emit('messageReceived', saveMessage);
  }
}
