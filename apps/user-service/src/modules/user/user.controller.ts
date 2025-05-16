import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(RMQ_CONSTANTS.PATTERN.GET_ANOTHER_USER)
  async getAnotherUser(@Body() body: { userId: string }) {
    return this.userService.getAnotherUser(body.userId);
  }
}
