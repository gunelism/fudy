import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../user/dto/user.dto'

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  register(@Body() credentials: RegisterDto) {
    return this.authService.register(credentials);
  }
  
  @Post('/login')
  @UsePipes(ValidationPipe)
  login( credentials: LoginDto) {
    return this.authService.login(credentials);
  }
}
