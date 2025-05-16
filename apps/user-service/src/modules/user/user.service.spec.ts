import { CreateProfileDto } from '@apps/api-gateway/src/modules/profile/dto/create-profile.dto';
import { MOCK_USER_CONSTANT } from '@commons/utils/constants/mock-data-test';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;

  const mockUserModel = {
    createUser: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
    validateUser: jest.fn().mockResolvedValue({
      usernameOrEmail: 'username',
      password: 'password',
    }),
    findUserByUsernameOrEmail: jest
      .fn()
      .mockResolvedValue({ usernameOrEmail: 'username' }),

    findUserById: jest.fn().mockResolvedValue('1'),
    updateProfile: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
    getAnotherUser: jest.fn().mockResolvedValue('1'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserModel)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const result = await service.createUser({
      username: 'username',
      email: 'email@mail.com',
      password: 'password',
    } as CreateUserDto);
    expect(result).toEqual(MOCK_USER_CONSTANT);
  });

  it('should validate user', async () => {
    const result = await service.validateUser('username', 'password');
    expect(result).toEqual({
      usernameOrEmail: 'username',
      password: 'password',
    });
  });

  it('should find user by username or email', async () => {
    const result = await service.findUserByUsernameOrEmail('username');
    expect(result).toEqual({
      usernameOrEmail: 'username',
    });
  });

  it('should find user by id', async () => {
    const result = await service.findUserById('1');
    expect(result).toEqual('1');
  });

  it('should update profile', async () => {
    const result = await service.updateProfile({} as CreateProfileDto);
    expect(result).toEqual(MOCK_USER_CONSTANT);
  });

  it('should get another user', async () => {
    const result = await service.getAnotherUser('1');
    expect(result).toEqual('1');
  });
});
