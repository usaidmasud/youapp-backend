import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MOCK_USER_CONSTANT } from '@commons/utils/constants/mock-data-test';

describe('ProfileController', () => {
  let controller: ProfileController;

  const mockProfileService = {
    createProfile: jest.fn(),
    updateProfile: jest.fn(),
    getProfile: jest.fn(),
    getAnotherUser: jest.fn(),
    getAstrology: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
      ],
    })
      .overrideProvider(ProfileService)
      .useValue(mockProfileService)
      .compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProfile', () => {
    it('should create profile', async () => {
      const result = {
        name: 'test',
        birthDate: 'test',
        gender: 'male',
        zodiac: 'test',
        horoscope: 'test',
        imageUrl: 'test',
        height: 180,
        weight: 70,
        interests: ['test'],
      };

      mockProfileService.createProfile.mockResolvedValue(result);

      expect(
        controller.createProfile(
          {
            name: 'test',
            birthDate: 'test',
            gender: 'male',
            zodiac: 'test',
            horoscope: 'test',
            imageUrl: 'test',
            height: 180,
            weight: 70,
            interests: ['test'],
          },
          'test',
        ),
      ).resolves.toEqual(result);
    });

    it('should throw error on create profile failure', async () => {
      mockProfileService.createProfile.mockRejectedValue(
        Object.assign(new Error('Create profile failed'), {
          statusCode: 400,
        }),
      );

      expect(
        controller.createProfile(
          {
            name: 'test',
            birthDate: 'test',
            gender: 'male',
            zodiac: 'test',
            horoscope: 'test',
            imageUrl: 'test',
            height: 180,
            weight: 70,
            interests: ['test'],
          },
          'test',
        ),
      ).rejects.toThrow();
    });
  });

  describe('updateProfile', () => {
    it('should update profile', async () => {
      const result = {
        name: 'test',
        birthDate: 'test',
        gender: 'male',
        zodiac: 'test',
        horoscope: 'test',
        imageUrl: 'test',
        height: 180,
        weight: 70,
        interests: ['test'],
      };

      mockProfileService.updateProfile.mockResolvedValue(result);

      expect(
        controller.updateProfile(
          {
            name: 'test',
            birthDate: 'test',
            gender: 'male',
            zodiac: 'test',
            horoscope: 'test',
            imageUrl: 'test',
            height: 180,
            weight: 70,
            interests: ['test'],
          },
          'test',
        ),
      ).resolves.toEqual(result);
    });

    it('should throw error on update profile failure', async () => {
      mockProfileService.updateProfile.mockRejectedValue(
        Object.assign(new Error('Update profile failed'), {
          statusCode: 400,
        }),
      );

      expect(
        controller.updateProfile(
          {
            name: 'test',
            birthDate: 'test',
            gender: 'male',
            zodiac: 'test',
            horoscope: 'test',
            imageUrl: 'test',
            height: 180,
            weight: 70,
            interests: ['test'],
          },
          'test',
        ),
      ).rejects.toThrow();
    });
  });

  describe('getProfile', () => {
    it('should get profile', async () => {
      const result = MOCK_USER_CONSTANT;

      mockProfileService.getProfile.mockResolvedValue(result);

      await expect(controller.getProfile('test')).resolves.toEqual(result);
    });

    it('should throw error on get profile failure', async () => {
      mockProfileService.getProfile.mockRejectedValue(
        Object.assign(new Error('Get profile failed'), {
          statusCode: 400,
        }),
      );

      expect(controller.getProfile('test')).rejects.toThrow();
    });
  });

  describe('getAnotherUser', () => {
    it('should get another user', async () => {
      const result = MOCK_USER_CONSTANT;

      mockProfileService.getAnotherUser.mockResolvedValue(result);

      await expect(controller.getAnotherUser('test')).resolves.toEqual(result);
    });

    it('should throw error on get another user failure', async () => {
      mockProfileService.getAnotherUser.mockRejectedValue(
        Object.assign(new Error('Get another user failed'), {
          statusCode: 400,
        }),
      );

      expect(controller.getAnotherUser('test')).rejects.toThrow();
    });
  });

  describe('getAstrology', () => {
    it('should get astrology', async () => {
      const result = {
        horoscope: 'test',
        zodiac: 'test',
      };

      mockProfileService.getAstrology.mockResolvedValue(result);

      await expect(
        controller.getAstrology({ birthDate: '2020-01-01' }),
      ).resolves.toEqual(result);
    });

    it('should throw error on get astrology failure', async () => {
      mockProfileService.getAstrology.mockRejectedValue(
        Object.assign(new Error('Get astrology failed'), {
          statusCode: 400,
        }),
      );

      await expect(
        controller.getAstrology({ birthDate: '2020-01-01' }),
      ).rejects.toThrow();
    });
  });
});
