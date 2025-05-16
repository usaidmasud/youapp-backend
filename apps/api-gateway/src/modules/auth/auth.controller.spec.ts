import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should login successfully', async () => {
      mockAuthService.login.mockResolvedValue({ accessToken: 'token' });

      await expect(
        controller.login({
          usernameOrEmail: 'test@example.com',
          password: 'test',
        }),
      ).resolves.toEqual({ accessToken: 'token' });
    });

    it('should throw error on login failure', async () => {
      mockAuthService.login.mockRejectedValue(
        Object.assign(new Error('Invalid password'), {
          statusCode: 401,
        }),
      );

      await expect(
        controller.login({
          usernameOrEmail: 'test@example.com',
          password: 'test',
        }),
      ).rejects.toMatchObject({
        message: 'Invalid password',
        statusCode: 401,
      });
    });
  });

  describe('register', () => {
    it('should register successfully', async () => {
      mockAuthService.register.mockResolvedValue({ success: true });

      await expect(
        controller.register({
          username: 'test',
          email: 'test@example.com',
          password: 'test',
        }),
      ).resolves.toEqual({ success: true });
    });
    it('should throw error on register failure', async () => {
      mockAuthService.register.mockRejectedValue(
        Object.assign(new Error('Username or email already exists'), {
          statusCode: 409,
        }),
      );

      await expect(
        controller.register({
          username: 'test',
          email: 'test@example.com',
          password: 'test',
        }),
      ).rejects.toMatchObject({
        message: 'Username or email already exists',
        statusCode: 409,
      });
    });
  });
});
