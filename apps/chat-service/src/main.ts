import { NestFactory } from '@nestjs/core';
import { ChatServiceModule } from './chat-service.module';
import * as dotenv from 'dotenv';
dotenv.config();
import { rabbitmqConfig } from 'commons/libs/configs/rabbitmq.config';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(ChatServiceModule, {
    ...rabbitmqConfig(),
  });

  await app.listen();
}
bootstrap();
