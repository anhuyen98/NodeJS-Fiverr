import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Capstone-Fiverr')
    .setDescription('API of Fiverr-Webside')
    .setContact(
      'An Huyen',
      'https://www.facebook.com/lionwin3898/',
      'eros3898@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swagger = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, swagger);
  await app.listen(3001);
}
bootstrap();
