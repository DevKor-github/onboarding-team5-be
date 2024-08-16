import { Entity, Column, PrimaryGeneratedColumn, Unique, JoinTable, ManyToMany } from 'typeorm';
import { ChatRoom } from './chatRoom.entity';

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

  @ManyToMany(() => ChatRoom, chatRoom => chatRoom.users, { eager: true })
  @JoinTable()
  chatRooms: ChatRoom[];
}
