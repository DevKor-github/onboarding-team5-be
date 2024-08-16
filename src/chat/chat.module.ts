import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { User } from 'src/entities/user.entity';
import { Message } from 'src/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, User, Message])],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController]
})
export class ChatModule {}
