import { CreateProfileDto } from '@apps/api-gateway/src/modules/profile/dto/create-profile.dto';
import { GetAstrologyDto } from '@apps/api-gateway/src/modules/profile/dto/get-astrology.dto';
import { MOCK_USER_CONSTANT } from '@commons/utils/constants/mock-data-test';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let controller: ProfileController;

  const mockProfileService = {
    getProfile: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
    createProfile: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
    updateProfile: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
    getAstrology: jest.fn().mockResolvedValue({
      horoscope: 'horoscope',
      zodiac: 'zodiac',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    })
      .overrideProvider(ProfileService)
      .useValue(mockProfileService)
      .compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get profile', () => {
    expect(controller.getProfile({ userId: '1' })).resolves.toEqual(
      MOCK_USER_CONSTANT,
    );
  });

  it('should create profile', () => {
    expect(controller.createProfile({} as CreateProfileDto)).resolves.toEqual(
      MOCK_USER_CONSTANT,
    );
  });

  it('should update profile', () => {
    expect(controller.updateProfile({} as CreateProfileDto)).resolves.toEqual(
      MOCK_USER_CONSTANT,
    );
  });

  it('should get astrology', () => {
    expect(controller.getAstrology({} as GetAstrologyDto)).resolves.toEqual({
      horoscope: 'horoscope',
      zodiac: 'zodiac',
    });
  });
});
