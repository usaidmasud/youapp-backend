import { Controller } from '@nestjs/common';
import { SocketService } from '../socket/socket.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { SendMessageDto } from '@apps/api-gateway/src/modules/chat/dto/send-message.dto';

@Controller('app')
export class AppController {
  constructor(private readonly socketService: SocketService) {}

  @MessagePattern(RMQ_CONSTANTS.PATTERN.SEND_NOTIFICATION)
  sendNotification(@Payload() data: SendMessageDto) {
    this.socketService.notifyUser({
      receiverId: data.receiverId,
      messages: data.messages,
    });
    return { success: true };
  }
}
