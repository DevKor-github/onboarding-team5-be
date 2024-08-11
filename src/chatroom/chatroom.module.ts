import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { Chatroom } from 'src/entities/chatroom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chatroom])],
  controllers: [ChatroomController],
  providers: [ChatroomService]
})
export class ChatroomModule {}
