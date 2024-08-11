import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { GetUserProfileDto } from './dtos/getUserProfile.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserProfile(id: number) :Promise<GetUserProfileDto> {
        const user = await this.userRepository.findOneBy({ id });
        if(!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");
        const { introduction, genre, profileImagePath } = user;
        const profile = { introduction, genre, profileImagePath };

        return profile;
    }

}
