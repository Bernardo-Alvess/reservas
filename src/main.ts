import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Reservas')
    .setDescription('API para gerenciamento de reservas')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.PRODUCTION_URL,
      'https://reserva-facil.xyz',
      'https://www.reserva-facil.xyz',
    ],
    credentials: true,
  });
  console.log(process.env.PRODUCTION_URL);
  await app.listen(process.env.PORT ?? 3000, () => {
    Logger.log(`Backend is up and running on port ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
