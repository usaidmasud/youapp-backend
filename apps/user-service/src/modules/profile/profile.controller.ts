import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProfileDto } from '@apps/api-gateway/src/modules/profile/dto/create-profile.dto';
import { GetAstrologyDto } from '@apps/api-gateway/src/modules/profile/dto/get-astrology.dto';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern(RMQ_CONSTANTS.PATTERN.GET_PROFILE_USER)
  getProfile(@Payload() payload: { userId: string }) {
    return this.profileService.getProfile(payload.userId);
  }

  @MessagePattern(RMQ_CONSTANTS.PATTERN.CREATE_PROFILE_USER)
  createProfile(@Payload() payload: CreateProfileDto) {
    return this.profileService.createProfile(payload);
  }

  @MessagePattern(RMQ_CONSTANTS.PATTERN.UPDATE_PROFILE_USER)
  updateProfile(@Payload() payload: CreateProfileDto) {
    return this.profileService.updateProfile(payload);
  }

  @MessagePattern(RMQ_CONSTANTS.PATTERN.GET_ASTROLOGY)
  getAstrology(@Payload() payload: GetAstrologyDto) {
    return this.profileService.getAstrology(payload);
  }
}
