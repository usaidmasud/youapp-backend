import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ClientsModule } from '@nestjs/microservices';
import { RMQ_CONSTANTS } from 'commons/utils/constants/rmq.constant';
import { rabbitmqConfig } from 'commons/libs/configs/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_CONSTANTS.SERVICE.CHAT,
        ...rabbitmqConfig(RMQ_CONSTANTS.QUEUE.CHAT),
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
