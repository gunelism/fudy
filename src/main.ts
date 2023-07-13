import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = app.get(ConfigService);

  const docBuilder = new DocumentBuilder()
    .setTitle('Fudy example')
    .setDescription('The fudy API description')
    .setVersion('1.0')
    .addTag('Fudy users')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'token' }, 'access_token')
    .build();
  const document = SwaggerModule.createDocument(app, docBuilder);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get("port"));
}
bootstrap();
