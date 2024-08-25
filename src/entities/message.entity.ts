import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { ChatRoom } from './chatRoom.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  senderId: number;

  @Column()
  chatRoomId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.messages, { cascade: true, onDelete: 'CASCADE' })
  sender: User;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages, { cascade: true, onDelete: 'CASCADE' })
  chatRoom: ChatRoom;
}
