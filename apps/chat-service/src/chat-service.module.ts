import { Module } from '@nestjs/common';
import { ChatServiceController } from './chat-service.controller';
import { ChatServiceService } from './chat-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schemas/chat.schema';
import * as dotenv from 'dotenv';
import { ClientsModule } from '@nestjs/microservices';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { rabbitmqConfig } from '@commons/libs/configs/rabbitmq.config';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CHAT_DB_URI),
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    ClientsModule.register([
      {
        name: RMQ_CONSTANTS.SERVICE.NOTIFICATION,
        ...rabbitmqConfig(RMQ_CONSTANTS.QUEUE.NOTIFICATION),
      },
    ]),
  ],
  controllers: [ChatServiceController],
  providers: [ChatServiceService],
})
export class ChatServiceModule {}
