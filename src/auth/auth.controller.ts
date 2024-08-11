import { Controller, Post, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';
import { UpdateProfileDto } from './dtos/updateProfile.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
      return await this.authService.signup(signupDto);
      // return { message: 'signup success' };
    }
  
    @Patch('update-profile')
    @UseGuards(AuthGuard('jwt-access'))
    async updateProfile(@Request() req, @Body() editProfileDto: UpdateProfileDto){
      const id = req.user.id;
      const { introduction, genre, profileImagePath } = editProfileDto;
      return await this.authService.updateProfile(id, introduction, genre, profileImagePath);
      // return { message: 'editProfile success' };
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
