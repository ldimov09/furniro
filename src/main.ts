import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payloads to DTO instances
    whitelist: true, // Strip properties not defined in the DTO
    forbidNonWhitelisted: true, // Throw errors if non-whitelisted properties are present
    exceptionFactory: (errors) => {
      // Custom exception factory to handle errors
      return new BadRequestException(errors);
    },
  }));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  await app.listen(3000);
}
bootstrap();
