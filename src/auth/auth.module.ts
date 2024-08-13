import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { JwtAccessStrategy } from 'src/auth/passports/jwtAccess.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({})  
  ],
  providers: [AuthService, JwtAccessStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
