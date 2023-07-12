import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { IsEmail } from 'class-validator';
import { Exclude, instanceToPlain } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}