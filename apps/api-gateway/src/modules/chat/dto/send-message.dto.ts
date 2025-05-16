import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    example: '',
    description: 'Receiver ID',
  })
  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @ApiProperty({
    example: '',
    description: 'Message',
  })
  @IsString()
  @IsNotEmpty()
  messages: string;
}
