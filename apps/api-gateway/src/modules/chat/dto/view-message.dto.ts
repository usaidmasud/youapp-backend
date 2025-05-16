import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SharedDto } from '@commons/utils/dto/shared.dto';

export class ViewMessageDto extends SharedDto {
  // @ApiProperty({
  //   example: '',
  //   description: 'Sender ID',
  // })
  // @IsOptional()
  // @IsString()
  // senderId: string;

  @ApiProperty({
    example: '',
    description: 'Receiver ID',
  })
  @IsString()
  receiverId: string;
}
