import { Controller, Post, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateProfileDTO } from './users.type';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() createUserDTO: CreateUserDTO, @Req() req: any) {
    const firebaseUid = req.user.uid;
    return this.usersService.createUser(createUserDTO, firebaseUid);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Body() updateProfileDTO: UpdateProfileDTO,
    @Req() req: any,
  ) {
    const firebaseUid = req.user.uid;
    console.log('req:', req);

    return this.usersService.updateProfile(updateProfileDTO, firebaseUid);
  }
}
