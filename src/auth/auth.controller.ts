import { Controller, Post, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
      return await this.authService.signup(signupDto);
      // return { message: 'signup success' };
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      return await this.authService.login(loginDto);
      // return { message: 'login success' };
    }

    @Post('refresh')
    async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }
    
}
