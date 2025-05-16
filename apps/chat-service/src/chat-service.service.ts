import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { SendMessageDto } from '@apps/api-gateway/src/modules/chat/dto/send-message.dto';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat-dto';
import { ViewChatDto } from './dto/view-chat-.dto';
import { Chat, ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatServiceService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @Inject(RMQ_CONSTANTS.SERVICE.NOTIFICATION) private client: ClientProxy,
  ) {}

  async sendMessage(payload: CreateChatDto) {
    try {
      const chat = new this.chatModel({
        senderId: payload.senderId,
        receiverId: payload.receiverId,
        messages: payload.messages,
      });
      const createdChat = chat.save();
      this.sendNotification(payload);
      return createdChat;
    } catch (error) {
      throw new Error(error);
    }
  }

  async viewMessage(chat: ViewChatDto) {
    try {
      const page = Math.max(1, parseInt(chat.page || '1'));
      const limit = Math.min(50, Math.max(1, parseInt(chat.pageSize || '10')));
      const skip = (page - 1) * limit;

      const [messages, total] = await Promise.all([
        this.chatModel
          .find({
            $or: [
              { senderId: chat.senderId, receiverId: chat.receiverId },
              { senderId: chat.receiverId, receiverId: chat.senderId },
            ],
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        this.chatModel.countDocuments({
          $or: [
            { senderId: chat.senderId, receiverId: chat.receiverId },
            { senderId: chat.receiverId, receiverId: chat.senderId },
          ],
        }),
      ]);

      return {
        data: messages,
        meta: {
          currentPage: page,
          pageSize: limit,
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendNotification(chat: SendMessageDto) {
    this.client.emit(RMQ_CONSTANTS.PATTERN.SEND_NOTIFICATION, chat);
  }
}
