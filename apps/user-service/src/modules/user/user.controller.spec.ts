import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MOCK_USER_CONSTANT } from '@commons/utils/constants/mock-data-test';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    getAnotherUser: jest.fn().mockResolvedValue([MOCK_USER_CONSTANT]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get another user', () => {
    expect(controller.getAnotherUser({ userId: '1' })).resolves.toEqual([
      MOCK_USER_CONSTANT,
    ]);
  });
});
