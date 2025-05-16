import { Test, TestingModule } from '@nestjs/testing';
import { ChatServiceController } from './chat-service.controller';
import { ChatServiceService } from './chat-service.service';

describe('ChatServiceController', () => {
  let chatServiceController: ChatServiceController;

  const mockChatServiceService = {
    sendMessage: jest.fn(),
    viewMessage: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatServiceController],
      providers: [
        {
          provide: ChatServiceService,
          useValue: mockChatServiceService,
        },
      ],
    }).compile();

    chatServiceController = app.get<ChatServiceController>(
      ChatServiceController,
    );
  });

  describe('sendMessage', () => {
    it('should send message ', async () => {
      const result = {
        success: true,
      };
      mockChatServiceService.sendMessage.mockResolvedValue(result);
      expect(
        chatServiceController.sendMessage({
          senderId: 'test',
          receiverId: 'test',
          messages: 'message',
        }),
      ).resolves.toEqual(result);
    });
  });

  describe('viewMessage', () => {
    it('should view message', async () => {
      const result = {
        data: [],
        meta: {
          currentPage: 1,
          pageSize: 10,
          totalItems: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
      mockChatServiceService.viewMessage.mockResolvedValue(result);
      expect(
        chatServiceController.viewMessage({
          senderId: 'test',
          receiverId: 'test',
          page: '1',
          pageSize: '10',
        }),
      ).resolves.toEqual(result);
    });
  });
});
