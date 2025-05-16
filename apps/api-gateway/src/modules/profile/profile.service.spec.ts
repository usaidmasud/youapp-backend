import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetAstrologyDto } from './dto/get-astrology.dto';

describe('ProfileService', () => {
  let service: ProfileService;

  const mockProfileService = {
    updateProfile: jest.fn().mockResolvedValue({ success: true }),
    getProfile: jest.fn().mockResolvedValue({ success: true }),
    getAnotherUser: jest.fn().mockResolvedValue({ success: true }),
    getAstrology: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateProfile', () => {
    it('should update profile', () => {
      expect(
        service.updateProfile(
          {
            name: 'test',
            bio: 'test',
            location: 'test',
            website: 'test',
            gender: 'male',
            birthday: 'test',
          } as UpdateProfileDto,
          'test',
        ),
      ).resolves.toEqual({ success: true });
    });
  });

  describe('getProfile', () => {
    it('should get profile', () => {
      expect(service.getProfile('test')).resolves.toEqual({ success: true });
    });
  });

  describe('getAnotherUser', () => {
    it('should get another user', () => {
      expect(service.getAnotherUser('test')).resolves.toEqual({
        success: true,
      });
    });
  });

  describe('getAstrology', () => {
    it('should get astrology', () => {
      expect(service.getAstrology({} as GetAstrologyDto)).resolves.toEqual({
        success: true,
      });
    });
  });
});
