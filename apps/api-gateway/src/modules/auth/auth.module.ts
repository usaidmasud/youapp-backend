import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitmqConfig } from '@commons/libs/configs/rabbitmq.config';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@apps/user-service/src/modules/auth/strategies';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_CONSTANTS.SERVICE.USER,
        ...rabbitmqConfig(RMQ_CONSTANTS.QUEUE.USER),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
