import { RmqOptions, Transport } from '@nestjs/microservices';
import { RMQ_CONSTANTS } from 'commons/utils/constants/rmq.constant';
import * as dotenv from 'dotenv';
dotenv.config();

export const rabbitmqConfig = (
  queue: string = RMQ_CONSTANTS.QUEUE.CHAT,
): RmqOptions => {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI],
      queue: queue,
      queueOptions: {
        durable: false,
      },
    },
  };
};
