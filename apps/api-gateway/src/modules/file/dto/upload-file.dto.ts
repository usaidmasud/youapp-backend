import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  @IsString()
  file: Express.Multer.File;
}
