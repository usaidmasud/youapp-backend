import { MOCK_USER_CONSTANT } from '@commons/utils/constants/mock-data-test';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    login: jest.fn().mockResolvedValue({
      accessToken: 'token',
    }),
    register: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
    validateUser: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
    createUser: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UserService],
    })
      .overrideProvider(JwtService)
      .useValue({ signAsync: jest.fn().mockResolvedValue('token') })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login', () => {
    expect(
      service.login({
        usernameOrEmail: 'username',
        password: 'password',
      }),
    ).resolves.toEqual({
      accessToken: 'token',
    });
  });

  it('should register', () => {
    expect(
      service.register({
        username: 'username',
        email: 'email@mail.com',
        password: 'password',
      }),
    ).resolves.toEqual(MOCK_USER_CONSTANT);
  });
});
