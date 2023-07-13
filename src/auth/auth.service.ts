import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDto } from 'src/models/user.model';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ){}

  async register(credentials: RegisterDto) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload = { name: credentials.name, email: credentials.email, password: credentials.password };
      const token = this.jwtService.sign(payload);
      return { user: {...user.toJSON(), token } };
    } catch (error) {
      if(error.code === "23505") {
        throw new ConflictException("User with this email already exits.");
      }
      throw new UnauthorizedException(error.message)
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepo.findOne({ where: { email } })
      const isValid = await user.comparePassword(password);
      if(!isValid){
        throw new UnauthorizedException("Invalid credentials");
      }
      const payload = { email: email, password: password };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJSON(), token } };
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
}
