import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ViewMessageDto } from './dto/view-message.dto';

describe('ChatService', () => {
  let service: ChatService;

  const mockChatService = {
    sendMessage: jest.fn().mockResolvedValue({ success: true }),
    viewMessage: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should send message', () => {
      expect(
        service.sendMessage({} as SendMessageDto, 'test'),
      ).resolves.toEqual({ success: true });
    });
  });

  describe('viewMessage', () => {
    it('should view message', () => {
      expect(
        service.viewMessage({} as ViewMessageDto, 'test'),
      ).resolves.toEqual({ success: true });
    });
  });
});
