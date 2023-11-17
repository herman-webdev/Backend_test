import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const port = process.env.PORT || 5001;
  const host = process.env.HOST || 'localhost';
  const baseUrl = `http://${host}:${port}`;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  Logger.log(`Application is running on: ${baseUrl}`);
}
bootstrap();
