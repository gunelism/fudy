import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { config } from "./config";
import { DatabaseConfig } from './db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }), // Load environment variables from .env file. 
    TypeOrmModule.forRootAsync({ // Async will wait till everything is loaded and then load typorm
      imports: [ConfigModule],
      useClass: DatabaseConfig
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
