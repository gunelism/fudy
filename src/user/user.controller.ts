import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard())
  findCurrentUser(@User() { email }: UserEntity) {
    return this.userService.findByEmail(email);
  }
}