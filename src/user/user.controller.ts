import { Controller, Get, Request, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt-access'))
    @Get('profile')
    async getUserProfile(@Query('id') id: number) {
        return await this.userService.getUserProfile(id);
    }
}
