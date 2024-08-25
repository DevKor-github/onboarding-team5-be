import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateChatRoomDto } from './dtos/createChatRoom.dto';
import { ChatService } from './chat.service';
import { Docs } from 'src/decorators/docs/chat.decorator';
import { SendMessageDto } from './dtos/sendMessage.dto';
import { LeaveChatRoomDto } from './dtos/leaveChatRoom.dto';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService
  ) { }

  afterInit() {
    this.server.emit("serverInit", { message: `서버 시작` });
    console.log("서버 시작")
  }

  async handleConnection(client: Socket) {
    await this.chatService.userSocketConnection(client);
    if (client.connected) {
      client.emit('welcomeMessage', { message: `Client connected: ${client.id}` });
      console.log(`Client connected: ${client.id}`);
    }
  }

  async handleDisconnect(client: Socket) {
    await this.chatService.userSocketDisconnection(client);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createChatRoom')
  @Docs('createChatRoom')
  async createChatRoom(@MessageBody() createChatRoomDto: CreateChatRoomDto, @ConnectedSocket() client: Socket) {
    const chatRoom = await this.chatService.createChatRoom(createChatRoomDto, this.server);
    client.emit('chatRoomCreated', chatRoom);

    return chatRoom;
  }

  @SubscribeMessage('leaveChatRoom')
  @Docs('leaveChatRoom')
  async leaveChatRoom(@MessageBody() leaveChatRoomDto: LeaveChatRoomDto, @ConnectedSocket() client: Socket) {
    await this.chatService.leaveChatRoom(leaveChatRoomDto, client);
    client.emit('leaveChatRoom', "채팅방에서 퇴장했습니다.");
  }

  @SubscribeMessage('reconnectChatRoom')
  @Docs('reconnectChatRoom')
  async reconnectChatRoom(@MessageBody() reconnectChatRoomDto: LeaveChatRoomDto, @ConnectedSocket() client: Socket) {
    const chatRoom = await this.chatService.reconnectChatRoom(reconnectChatRoomDto);
    client.emit('reconnectChatRoom', chatRoom);
  }

  @SubscribeMessage('sendMessage')
  @Docs('sendMessage')
  async sendMessage(@MessageBody() sendMessageDto: SendMessageDto) {
    const saveMessage = await this.chatService.saveMessage(sendMessageDto);
    this.server.to(`room-${sendMessageDto.chatRoomId}`).emit('messageReceived', saveMessage);
  }

  @SubscribeMessage('getChatRoomUserInfo')
  @Docs('getChatRoomUserInfo')
  async getChatRoomUserInfo(@MessageBody() chatRoomId: number, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      const users = await this.chatService.getUsersInChatRoom(chatRoomId);
      this.server.to(`room-${chatRoomId}`).emit('usersInChatRoom', users);
    } catch (error) {
      client.emit('error', { message: error.message });
    }
  }
}
