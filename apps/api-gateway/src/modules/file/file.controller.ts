import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@apps/user-service/src/modules/auth/guards';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { join } from 'path';
import { cwd } from 'process';
import { FileService } from './file.service';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('upload-profile')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() photo: Express.Multer.File) {
    return await this.fileService.uploadPhotoProfile(photo);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = join(cwd(), 'uploads', filename);
      res.sendFile(filePath);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
