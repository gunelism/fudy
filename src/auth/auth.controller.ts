import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../models/user.model'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: RegisterDto })
  register(@Body(ValidationPipe) credentials: RegisterDto) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto })
  login(@Body(ValidationPipe) credentials: LoginDto) {
    return this.authService.login(credentials);
  }
}
