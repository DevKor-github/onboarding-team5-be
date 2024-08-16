import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from './user.entity'; // Adjust the path according to your project structure
  import { ChatRoom } from './chatRoom.entity'; // Adjust the path according to your project structure
  
  @Entity()
  export class Message {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    content: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @ManyToOne(() => User, (user) => user.messages)
    sender: User;
  
    @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
    chatRoom: ChatRoom;
  }
  