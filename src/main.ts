import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('MiaList')
    .setDescription('list management app')
    .setVersion('3.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('home')
    .addTag('users')
    .addTag('categories')
    .addTag('tags')
    .addTag('lists')
    .addTag('entries')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
