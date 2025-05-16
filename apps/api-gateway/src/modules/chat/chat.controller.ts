import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from '@apps/api-gateway/src/modules/chat/dto/send-message.dto';
import { ViewMessageDto } from '@apps/api-gateway/src/modules/chat/dto/view-message.dto';
import { JwtGuard } from '@apps/user-service/src/modules/auth/guards';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUserId } from '@commons/libs/decorators';

@ApiTags('Chat')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send-message')
  sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @GetUserId() userId: string,
  ) {
    return this.chatService.sendMessage(sendMessageDto, userId);
  }

  @Get('view-message')
  viewMessage(
    @Query() viewMessageDto: ViewMessageDto,
    @GetUserId() userId: string,
  ) {
    return this.chatService.viewMessage(viewMessageDto, userId);
  }
}
