import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { Response } from 'express';
import { join } from 'path';
import { cwd } from 'process';

describe('FileController', () => {
  let controller: FileController;

  const mockFileService = {
    uploadPhotoProfile: jest.fn(),
    getFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
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

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload photo profile', async () => {
      mockFileService.uploadPhotoProfile.mockResolvedValue({
        filename: 'test',
      });
      await expect(
        controller.uploadFile({} as Express.Multer.File),
      ).resolves.not.toThrow();
    });

    it('should throw error on upload failure', async () => {
      mockFileService.uploadPhotoProfile.mockRejectedValue(
        Object.assign(new Error('Error uploading file'), {
          statusCode: 500,
        }),
      );

      await expect(
        controller.uploadFile({} as Express.Multer.File),
      ).rejects.toThrow();
    });
  });

  describe('getFile', () => {
    it('should get file', async () => {
      const filename = 'test.jpg';
      mockFileService.getFile.mockResolvedValue({
        filename,
      });
      const mockRes = {
        sendFile: jest.fn(),
      };
      await controller.getFile(filename, mockRes as unknown as Response);
      expect(mockRes.sendFile).toHaveBeenCalledWith(
        join(cwd(), 'uploads', filename),
      );
    });

    it('should throw error on get file failure', async () => {
      mockFileService.getFile.mockRejectedValue(
        Object.assign(new Error('File not found'), {
          statusCode: 404,
        }),
      );

      await expect(
        controller.getFile('test', {} as Response),
      ).rejects.toThrow();
    });
  });
});
