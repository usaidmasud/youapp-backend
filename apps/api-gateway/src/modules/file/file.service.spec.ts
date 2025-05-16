import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  const mockFileService = {
    uploadPhotoProfile: jest.fn().mockResolvedValue({ filename: 'test' }),
    getFile: jest.fn().mockResolvedValue({ filename: 'test' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FileService,
          useValue: mockFileService,
        },
      ],
    })
      .overrideProvider(FileService)
      .useValue(mockFileService)
      .compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadPhotoProfile', () => {
    it('should upload photo profile', () => {
      expect(
        service.uploadPhotoProfile({} as Express.Multer.File),
      ).resolves.toEqual({ filename: 'test' });
    });

    it('should throw error on upload photo profile failure', () => {
      mockFileService.uploadPhotoProfile.mockRejectedValue(
        Object.assign(new Error('File not found'), {
          statusCode: 404,
        }),
      );

      expect(
        service.uploadPhotoProfile({} as Express.Multer.File),
      ).rejects.toThrow();
    });
  });

  describe('getFile', () => {
    it('should get file', () => {
      expect(service.getFile('test')).resolves.toEqual({ filename: 'test' });
    });

    it('should throw error on get file failure', () => {
      mockFileService.getFile.mockRejectedValue(
        Object.assign(new Error('File not found'), {
          statusCode: 404,
        }),
      );

      expect(service.getFile('test')).rejects.toThrow();
    });
  });
});
