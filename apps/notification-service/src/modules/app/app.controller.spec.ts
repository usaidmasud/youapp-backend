import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SocketService } from '../socket/socket.service';
import { SendMessageDto } from '@apps/api-gateway/src/modules/chat/dto/send-message.dto';

describe('AppController', () => {
  let controller: AppController;

  const mockSocketService = {
    notifyUser: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [SocketService],
    })
      .overrideProvider(SocketService)
      .useValue(mockSocketService)
      .compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should notify user', () => {
    const payload: SendMessageDto = {
      receiverId: 'test',
      messages: 'message',
    };

    const result = controller.sendNotification(payload);
    expect(result).toEqual({ success: true });
    expect(mockSocketService.notifyUser).toHaveBeenCalledWith(payload);
  });
});
