import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue({ accessToken: 'token' }),
    register: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', () => {
    expect(
      controller.login({
        usernameOrEmail: 'username',
        password: 'password',
      }),
    ).resolves.toEqual({
      accessToken: 'token',
    });
  });

  it('should register', () => {
    expect(
      controller.register({
        username: 'username',
        email: 'email@mail.com',
        password: 'password',
      }),
    ).resolves.toEqual({
      success: true,
    });
  });
});
