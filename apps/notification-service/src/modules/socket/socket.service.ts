import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SendMessageDto } from '@apps/api-gateway/src/modules/chat/dto/send-message.dto';

@Injectable()
export class SocketService {
  constructor(private readonly socketGateway: SocketGateway) {}

  notifyUser(payload: SendMessageDto) {
    this.socketGateway.sendNotification(payload.receiverId, payload.messages);
    return { success: true };
  }
}
