import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { GetUserInfoDto } from './dtos/getUserInfo.dto';
import { GetMyInfoDto } from './dtos/getMyInfo.dto';
import { UpdateProfileDto } from './dtos/updateProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('S3_CLIENT')
    private readonly s3Client: S3Client
  ) {}

  async findAll(): Promise<Partial<User>[]> {
    return await this.userRepository
    .createQueryBuilder('user')
    .select(['user.id', 'user.name', 'user.introduction', 'user.profileImagePath'])
    .getMany();
  }

  async getMyInfo(id: number): Promise<GetMyInfoDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");
    const { name, email, password, introduction, profileImagePath } = user;
    const userInfo = { name, email, password, introduction, profileImagePath };

    return userInfo;
  }

  async getUserInfo(userId: number): Promise<GetUserInfoDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");
    const { id, name, introduction, profileImagePath } = user;
    const userInfo = { id, name, introduction, profileImagePath };

    return userInfo;
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('존재하지 않는 사용자 입니다.');

    const { name, email, password, introduction, profileImagePath } = updateProfileDto;

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = password ?? user.password;
    user.introduction = introduction ?? user.introduction;
    user.profileImagePath = profileImagePath ?? user.profileImagePath;

    await this.userRepository.save(user);
  }

  /*
  async updateProfileImage(): Promise<string> {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const key = `profile-images/${Date.now()}-${file.originalname}`;

    await this.s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      //Body: file.buffer,
      //ContentType: file.mimetype,
    }));

    return `https://${bucketName}.s3.amazonaws.com/${key}`;
  }
    */

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.remove(user);
  }
}
