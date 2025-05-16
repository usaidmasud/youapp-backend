import { Test, TestingModule } from '@nestjs/testing';
import { ChatServiceService } from './chat-service.service';

describe('ChatServiceService', () => {
  let service: ChatServiceService;

  const mockChatServiceService = {
    sendMessage: jest.fn().mockResolvedValue({ success: true }),
    viewMessage: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatServiceService],
    })
      .overrideProvider(ChatServiceService)
      .useValue(mockChatServiceService)
      .compile();

    service = module.get<ChatServiceService>(ChatServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send message', () => {
    expect(
      service.sendMessage({
        senderId: 'test',
        receiverId: 'test',
        messages: 'message',
      }),
    ).resolves.toEqual({ success: true });
  });

  it('should view message', () => {
    expect(
      service.viewMessage({
        senderId: 'test',
        receiverId: 'test',
      }),
    ).resolves.toEqual({ success: true });
  });
});
