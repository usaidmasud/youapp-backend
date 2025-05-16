import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ViewMessageDto } from './dto/view-message.dto';

describe('ChatController', () => {
  let controller: ChatController;
  const mockChatConstants = {
    senderId: 'senderId',
    receiverId: 'receiverId',
    messages: 'messages',
    _id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    __v: 0,
  };

  const mockChatService = {
    sendMessage: jest.fn(),
    viewMessage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useValue: mockChatService,
        },
      ],
    })
      .overrideProvider(ChatService)
      .useValue(mockChatService)
      .compile();

    controller = module.get<ChatController>(ChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should send message', () => {
      const result = {
        ...mockChatConstants,
      };
      mockChatService.sendMessage.mockResolvedValue(result);
      expect(
        controller.sendMessage(
          {
            receiverId: 'receiverId',
            messages: 'messages',
          },
          'senderId',
        ),
      ).resolves.toEqual(result);
    });
    it('should throw error on send message failure', () => {
      mockChatService.sendMessage.mockRejectedValue(new Error('test'));
      expect(
        controller.sendMessage(
          {
            receiverId: 'receiverId',
            messages: 'messages',
          },
          'senderId',
        ),
      ).rejects.toThrowError();
    });
  });

  describe('viewMessage', () => {
    it('should view message', () => {
      const result = {
        data: [mockChatConstants],
        meta: {
          currentPage: 1,
          pageSize: 10,
          totalItems: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
      mockChatService.viewMessage.mockResolvedValue(result);
      expect(
        controller.viewMessage({} as ViewMessageDto, 'senderId'),
      ).resolves.toEqual(result);
    });
    it('should throw error on view message failure', () => {
      mockChatService.viewMessage.mockRejectedValue(new Error('senderId'));
      expect(
        controller.viewMessage({} as ViewMessageDto, 'senderId'),
      ).rejects.toThrowError();
    });
  });
});
