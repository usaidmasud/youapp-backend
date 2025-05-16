import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { ChatServiceService } from './chat-service.service';
import { CreateChatDto } from './dto/create-chat-dto';
import { ViewChatDto } from './dto/view-chat-.dto';

@Controller()
export class ChatServiceController {
  constructor(private readonly chatServiceService: ChatServiceService) {}

  @MessagePattern(RMQ_CONSTANTS.PATTERN.SEND_CHAT)
  sendMessage(@Payload() chat: CreateChatDto) {
    return this.chatServiceService.sendMessage({
      senderId: chat.senderId,
      receiverId: chat.receiverId,
      messages: chat.messages,
    });
  }

  @MessagePattern(RMQ_CONSTANTS.PATTERN.VIEW_CHAT)
  viewMessage(@Payload() chat: ViewChatDto) {
    return this.chatServiceService.viewMessage(chat);
  }
}
