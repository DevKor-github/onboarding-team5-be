import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}
