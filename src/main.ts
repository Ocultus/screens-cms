import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  APPLICATION_PORT,
  AWS_ACCESS_KEY,
  AWS_KEY_ID,
  AWS_REGION,
} from './config/configuration';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Screen cms')
    .setDescription('Screen cms')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  app.enableCors();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  config.update({
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_ACCESS_KEY,
    region: AWS_REGION,
  });

  await app.listen(APPLICATION_PORT | 3000);
}
bootstrap();
