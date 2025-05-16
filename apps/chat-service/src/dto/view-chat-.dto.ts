import { IsOptional, IsString } from 'class-validator';

export class ViewChatDto {
  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  pageSize?: string;
}
