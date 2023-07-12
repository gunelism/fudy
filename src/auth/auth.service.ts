import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  private mockUser = {
    email: 'gun@test.com',
    name: 'gunel',
    token: 'testtoken',
    password: 'pass'
  }

  register(credentials: RegisterDto) {
    return this.mockUser;
  }

  login(credentials: LoginDto) {
    if(credentials.email){}
  }
}
