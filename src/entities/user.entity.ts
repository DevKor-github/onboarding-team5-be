import { Entity, Column, PrimaryGeneratedColumn, Unique, JoinTable, OneToMany, ManyToMany } from 'typeorm';
import { ChatRoom } from './chatRoom.entity';
import { Message } from './message.entity';

@Entity()
@Unique(['email'])
@Unique(['nickname'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  introduction?: string;

  @Column({ nullable: true })
  genre?: string;

  @Column({ nullable: true })
  profileImagePath?: string;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @ManyToMany(() => ChatRoom, chatRoom => chatRoom.users, { eager: true })
  @JoinTable()
  chatRooms: ChatRoom[];
}
