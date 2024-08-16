import { Controller, Get, Patch, Delete, Request, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/updateProfile.dto';
import { Docs } from 'src/decorators/docs/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('user-info')
  @Docs('user-info')
  async getUserInfo(@Request() req, @Query('id') id: number) {
    const myId = req.user.id;
    if (myId == id) return await this.userService.getMyInfo(id);
    else return await this.userService.getUserInfo(id);
  }

  @Get()
  @Docs('get-all')
  async findAll() {
    return await this.userService.findAll();
  }

  @Patch('update-profile')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('update-profile')
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    const id = req.user.id;
    return await this.userService.updateProfile(id, updateProfileDto);
    // return { message: 'editProfile success' };
  }

  @Delete('delete')
  @UseGuards(AuthGuard('jwt-access'))
  @Docs('delete')
  async deleteUser(@Request() req) {
    const userId = req.user.id;
    return await this.userService.deleteUser(userId);
  }
}
