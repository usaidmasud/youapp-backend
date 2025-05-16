import { Test, TestingModule } from '@nestjs/testing';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway'; // Tambahkan ini
import { SendMessageDto } from '@apps/api-gateway/src/modules/chat/dto/send-message.dto';

describe('SocketService', () => {
  let service: SocketService;

  const mockSocketGateway = {
    sendNotification: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocketService,
        {
          provide: SocketGateway,
          useValue: mockSocketGateway, // ✅ Inject dependency-nya, bukan service-nya
        },
      ],
    }).compile();

    service = module.get<SocketService>(SocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should notify user', () => {
    const payload: SendMessageDto = {
      receiverId: 'test',
      messages: 'message',
    };

    const result = service.notifyUser(payload);
    expect(result).toEqual({ success: true });
    expect(mockSocketGateway.sendNotification).toHaveBeenCalledWith(
      'test',
      'message',
    );
  });
});
