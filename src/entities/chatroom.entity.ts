import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Chatroom {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    title: string;
    
    @Column()
    genre: string;
    
    @Column()
    keywords: string;
    
    @Column()
    mainImagePath: string;
    
    @UpdateDateColumn()
    lastChattedTime: Date; 
}

