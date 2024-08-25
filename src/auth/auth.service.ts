import { Injectable, ConflictException, UnauthorizedException, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity'
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
      ) {}

      async signup(signupDto: SignupDto): Promise<void> {
        const { name, email, password } = signupDto;  
        if (!name || !email || !password) throw new ConflictException('작성하지 않은 항목이 있습니다.');
    
        const userByEmail = await this.userRepository.findOne({ where: { email } });
        if (userByEmail) throw new ConflictException('이미 사용중인 이메일 입니다.');

        const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordCheck.test(password)) throw new UnauthorizedException('비밀번호는 최소 8자 이상이어야 하며, 영어, 숫자, 특수문자를 각각 최소 하나 이상 포함해야 합니다.');
    
        const hashedPassword = await hash(password, 10);
        const newUser = this.userRepository.create({
          name,
          email,
          password: hashedPassword,
        });
    
        await this.userRepository.save(newUser);
      }
    
      async login(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string; myId: number; }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({ where: {email} });
        if (!user) throw new NotFoundException('존재하지 않는 사용자 입니다.');
    
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid)  throw new UnauthorizedException('이메일 혹은 비밀번호가 틀렸습니다.');
    
        // JWT 인증

        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        });

        const refreshToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });

        const myId = user.id;

        return { accessToken, refreshToken, myId };
      }

      async refreshToken(oldRefreshToken: string): Promise<{ accessToken: string }> {
        try {
          const decoded = this.jwtService.verify(oldRefreshToken, {
            secret: process.env.JWT_REFRESH_SECRET,
          });
    
          const user = await this.userRepository.findOne({ where: {id: decoded.sub} });
          if (!user) throw new UnauthorizedException('Invalid refresh token');
    
          const payload = { sub: user.id, email: user.email };
          const newAccessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
          });
    
          return { accessToken: newAccessToken };
        } catch (error) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
}
