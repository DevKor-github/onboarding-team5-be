import { Controller, Get, Patch, Delete, Request, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/updateProfile.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt-access'))
    @Get('profile')
    async getUserProfile(@Query('id') id: number) {
        return await this.userService.getUserProfile(id);
    }

    @Get()
    async findAll(){
        return await this.userService.findAll();
    }

    @Patch('update-profile')
    @UseGuards(AuthGuard('jwt-access'))
    async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto){
      const id = req.user.id;
      const { introduction, genre, profileImagePath } = updateProfileDto;
      return await this.userService.updateProfile(id, introduction, genre, profileImagePath);
      // return { message: 'editProfile success' };
    }

    @Delete('delete')
    @UseGuards(AuthGuard('jwt-access'))
    async deleteUser(@Request() req) {
      const userId = req.user.id;
      return await this.userService.deleteUser(userId);
    }
}
