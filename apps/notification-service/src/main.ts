import { NestFactory } from '@nestjs/core';
import { rabbitmqConfig } from 'commons/libs/configs/rabbitmq.config';
import { RMQ_CONSTANTS } from 'commons/utils/constants/rmq.constant';
import { AppModule } from './modules/app/app.module';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    ...rabbitmqConfig(RMQ_CONSTANTS.QUEUE.NOTIFICATION),
  });

  app.startAllMicroservices();
  await app.listen(process.env.NOTIFICATION_SERVICE_PORT);

  console.log(
    `Notification service running on port ${process.env.NOTIFICATION_SERVICE_PORT}`,
  );
}
bootstrap();
