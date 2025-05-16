import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'dev',
    description: 'Username or email',
  })
  @IsString()
  usernameOrEmail: string;

  @ApiProperty({
    example: 'password',
    description: 'Password',
  })
  @IsString()
  password: string;
}
