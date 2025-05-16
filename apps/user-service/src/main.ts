import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { rabbitmqConfig } from 'commons/libs/configs/rabbitmq.config';
import { RMQ_CONSTANTS } from 'commons/utils/constants/rmq.constant';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    ...rabbitmqConfig(RMQ_CONSTANTS.QUEUE.USER),
  });

  await app.listen();
}
bootstrap();
