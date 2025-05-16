import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetAstrologyDto {
  @ApiProperty({
    example: '2025-05-11',
    description: 'Birth date',
  })
  @IsString()
  birthDate: string;
}
