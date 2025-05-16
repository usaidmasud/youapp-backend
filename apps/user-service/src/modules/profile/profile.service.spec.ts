import { MOCK_USER_CONSTANT } from '@commons/utils/constants/mock-data-test';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  const mockProfileModel = {
    createProfile: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
    updateProfile: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
    getHoroscope: jest.fn().mockResolvedValue('horoscope'),
    getZodiac: jest.fn().mockResolvedValue('zodiac'),
    getAstrology: jest.fn().mockResolvedValue({
      horoscope: 'horoscope',
      zodiac: 'zodiac',
    }),
    getProfile: jest.fn().mockResolvedValue(MOCK_USER_CONSTANT),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService],
    })
      .overrideProvider(ProfileService)
      .useValue(mockProfileModel)
      .compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create profile', async () => {
    const result = await service.createProfile({
      userId: '1',
      birthDate: 'birthDate',
      name: 'name',
      height: 1,
      weight: 1,
      gender: 'gender',
      horoscope: 'horoscope',
      zodiac: 'zodiac',
      interests: ['interests'],
      imageUrl: 'imageUrl',
    });
    expect(result).toEqual(MOCK_USER_CONSTANT);
  });

  it('should get profile', async () => {
    const result = await service.getProfile('1');
    expect(result).toEqual(MOCK_USER_CONSTANT);
  });

  it('should update profile', async () => {
    const result = await service.updateProfile({
      userId: '1',
      birthDate: 'birthDate',
      name: 'name',
      height: 1,
      weight: 1,
      gender: 'gender',
      horoscope: 'horoscope',
      zodiac: 'zodiac',
      interests: ['interests'],
      imageUrl: 'imageUrl',
    });
    expect(result).toEqual(MOCK_USER_CONSTANT);
  });

  it('should get horoscope', async () => {
    const result = await service.getHoroscope({ birthDate: 'birthDate' });
    expect(result).toEqual('horoscope');
  });

  it('should get zodiac', async () => {
    const result = await service.getZodiac({ birthDate: 'birthDate' });
    expect(result).toEqual('zodiac');
  });

  it('should get astrology', async () => {
    const result = await service.getAstrology({ birthDate: 'birthDate' });
    expect(result).toEqual({
      horoscope: 'horoscope',
      zodiac: 'zodiac',
    });
  });
});
