import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitmqConfig } from 'commons/libs/configs/rabbitmq.config';
import { RMQ_CONSTANTS } from 'commons/utils/constants/rmq.constant';
import { SocketModule } from '../socket/socket.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    SocketModule,
    ClientsModule.register([
      {
        name: RMQ_CONSTANTS.SERVICE.NOTIFICATION,
        ...rabbitmqConfig(RMQ_CONSTANTS.QUEUE.NOTIFICATION),
      },
    ]),
  ],
  controllers: [AppController],
  providers: [SocketModule],
})
export class AppModule {}
