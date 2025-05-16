import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { of, throwError } from 'rxjs';
import { HttpException } from '@nestjs/common';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';

describe('AuthService', () => {
  let service: AuthService;

  const mockAuthClient = {
    send: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: RMQ_CONSTANTS.SERVICE.USER,
          useValue: mockAuthClient,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const loginDto = {
        usernameOrEmail: 'test@example.com',
        password: 'test',
      };
      const expectedResult = { accessToken: 'token' };

      mockAuthClient.send.mockReturnValue(of(expectedResult));
      const result = await service.login(loginDto);
      expect(result).toEqual(expectedResult);
      expect(mockAuthClient.send).toHaveBeenCalledWith(
        RMQ_CONSTANTS.PATTERN.LOGIN,
        loginDto,
      );
    });

    it('should throw error on login failure', async () => {
      const loginDto = {
        usernameOrEmail: 'test@example.com',
        password: 'test',
      };
      const error = { message: 'Invalid credentials', code: 401 };

      mockAuthClient.send.mockReturnValue(throwError(() => error));

      await expect(service.login(loginDto)).rejects.toThrow(HttpException);
      await expect(service.login(loginDto)).rejects.toMatchObject({
        message: error.message,
        status: error.code,
      });
    });
  });

  describe('register', () => {
    it('should register successfully', async () => {
      const registerDto = {
        username: 'test',
        email: 'test@example.com',
        password: 'test',
      };
      const expectedResult = { success: true };

      mockAuthClient.send.mockReturnValue(of(expectedResult));
      const result = await service.register(registerDto);
      expect(result).toEqual(expectedResult);
      expect(mockAuthClient.send).toHaveBeenCalledWith(
        RMQ_CONSTANTS.PATTERN.REGISTER,
        registerDto,
      );
    });

    it('should throw error on register failure', async () => {
      const registerDto = {
        username: 'test',
        email: 'test@example.com',
        password: 'test',
      };
      const error = { message: 'Invalid credentials', code: 401 };

      mockAuthClient.send.mockReturnValue(throwError(() => error));

      await expect(service.register(registerDto)).rejects.toThrow(
        HttpException,
      );
      await expect(service.register(registerDto)).rejects.toMatchObject({
        message: error.message,
        status: error.code,
      });
    });
  });
});
