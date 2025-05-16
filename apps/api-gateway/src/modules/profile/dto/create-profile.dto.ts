import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProfileDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '1990-01-01',
  })
  @IsString()
  birthDate: string;

  @ApiProperty({
    example: 'Male',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    example: 'Aries',
  })
  @IsString()
  @IsOptional()
  zodiac: string;

  @ApiProperty({
    example: 'Aries',
  })
  @IsOptional()
  @IsString()
  horoscope: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    example: 180,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  height: number;

  @ApiProperty({
    example: 70,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  weight: number;

  @ApiProperty({
    example: ['Sports', 'Music'],
  })
  @IsString({ each: true })
  @IsArray()
  interests: string[];

  @IsString()
  @IsOptional()
  userId?: string;
}
