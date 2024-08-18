import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserSocket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  socketId: string;
}
