import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { GetUserProfileDto } from './dtos/getUserInfo.dto';
import { GetMyProfileDto } from './dtos/getMyInfo.dto';
import { UpdateProfileDto } from './dtos/updateProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getMyInfo(id: number): Promise<GetMyProfileDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");
    const { name, email, password, introduction, genre, profileImagePath } = user;
    const userInfo = { name, email, password, introduction, genre, profileImagePath };

    return userInfo;
  }

  async getUserInfo(userId: number): Promise<GetUserProfileDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");
    const { id, name, introduction, genre, profileImagePath } = user;
    const userInfo = { id, name, introduction, genre, profileImagePath };

    return userInfo;
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    const { name, email, password, introduction, genre, profileImagePath } = updateProfileDto;

    if (!user) throw new NotFoundException('존재하지 않는 사용자 입니다.');

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = password ?? user.password;
    user.introduction = introduction ?? user.introduction;
    user.genre = genre ?? user.genre;
    user.profileImagePath = profileImagePath ?? user.profileImagePath;

    await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.remove(user);
  }
}
