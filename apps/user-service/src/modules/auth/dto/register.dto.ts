import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'dev',
    description: 'Username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'dev@mail.com',
    description: 'Email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password',
  })
  @IsString()
  password: string;
}
