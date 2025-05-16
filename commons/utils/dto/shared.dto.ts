import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SharedDto {
  @ApiProperty({
    example: 1,
    description: 'Page',
    required: false,
  })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiProperty({
    example: 10,
    description: 'Page Size',
    required: false,
  })
  @IsOptional()
  @IsString()
  pageSize?: string;
}
