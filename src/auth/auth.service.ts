import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private userRepo:
  Repository<UserEntity>){}

  async register(credentials: RegisterDto) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      return user;
    } catch (error) {
      if(error.code === "23505") {
        throw new ConflictException("User with this email already exits.");
      }
      throw new InternalServerErrorException(error)
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      console.log(email);
      const user = await this.userRepo.findOne({where: {email}})
      const isValid = await user.comparePassword(password);
      if(!isValid){
        throw new UnauthorizedException("Invalid credentials");
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException("Invalid credentials")
    }
  }
}
