import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@apps/user-service/src/modules/auth/guards';
import { GetUserId } from '@commons/libs/decorators';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetAstrologyDto } from './dto/get-astrology.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createProfile(
    @Body() body: CreateProfileDto,
    @GetUserId() userId: string,
  ) {
    return await this.profileService.createProfile(body, userId);
  }

  @Get()
  async getProfile(@GetUserId() userId: string) {
    return await this.profileService.getProfile(userId);
  }

  @Put()
  async updateProfile(
    @Body() body: UpdateProfileDto,
    @GetUserId() userId: string,
  ) {
    return await this.profileService.updateProfile(body, userId);
  }

  @Get('astrology')
  async getAstrology(@Query() query: GetAstrologyDto) {
    return await this.profileService.getAstrology(query);
  }

  @Get('another-user')
  async getAnotherUser(@GetUserId() userId: string) {
    return await this.profileService.getAnotherUser(userId);
  }
}
