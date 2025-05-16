import { Injectable } from '@nestjs/common';
import { SendMessageDto } from '@apps/api-gateway/src/modules/chat/dto/send-message.dto';
import { ViewMessageDto } from '@apps/api-gateway/src/modules/chat/dto/view-message.dto';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(
    @Inject(RMQ_CONSTANTS.SERVICE.CHAT)
    private readonly chatClient: ClientProxy,
  ) {}

  async sendMessage(sendMessageDto: SendMessageDto, userId: string) {
    return lastValueFrom(
      this.chatClient.send(RMQ_CONSTANTS.PATTERN.SEND_CHAT, {
        ...sendMessageDto,
        senderId: userId,
      }),
    );
  }

  async viewMessage(viewMessageDto: ViewMessageDto, userId: string) {
    return lastValueFrom(
      this.chatClient.send(RMQ_CONSTANTS.PATTERN.VIEW_CHAT, {
        ...viewMessageDto,
        senderId: userId,
      }),
    );
  }
}
