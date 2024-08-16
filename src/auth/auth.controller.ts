import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import { Docs } from 'src/decorators/docs/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @Docs('signup')
    async signup(@Body() signupDto: SignupDto) {
      return await this.authService.signup(signupDto);
      // return { message: 'signup success' };
    }

    @Post('login')
    @Docs('login')
    async login(@Body() loginDto: LoginDto) {
      return await this.authService.login(loginDto);
      // return { message: 'login success' };
    }

    @Post('refresh')
    async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }
    
}
