import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitmqConfig } from '@commons/libs/configs/rabbitmq.config';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_CONSTANTS.SERVICE.USER,
        ...rabbitmqConfig(RMQ_CONSTANTS.QUEUE.USER),
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
