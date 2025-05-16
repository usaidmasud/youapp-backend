import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_CONSTANTS } from '@commons/utils/constants/rmq.constant';
import { lastValueFrom } from 'rxjs';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetAstrologyDto } from './dto/get-astrology.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(RMQ_CONSTANTS.SERVICE.USER)
    private readonly client: ClientProxy,
  ) {}

  async getProfile(userId: string) {
    try {
      return await lastValueFrom(
        this.client.send(RMQ_CONSTANTS.PATTERN.GET_PROFILE_USER, { userId }),
      );
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async createProfile(payload: CreateProfileDto, userId: string) {
    try {
      return await lastValueFrom(
        this.client.send(RMQ_CONSTANTS.PATTERN.CREATE_PROFILE_USER, {
          ...payload,
          userId,
        }),
      );
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async updateProfile(payload: UpdateProfileDto, userId: string) {
    try {
      return await lastValueFrom(
        this.client.send(RMQ_CONSTANTS.PATTERN.UPDATE_PROFILE_USER, {
          ...payload,
          userId,
        }),
      );
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async getAstrology(payload: GetAstrologyDto) {
    try {
      return await lastValueFrom(
        this.client.send(RMQ_CONSTANTS.PATTERN.GET_ASTROLOGY, payload),
      );
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  async getAnotherUser(userId: string) {
    try {
      return await lastValueFrom(
        this.client.send(RMQ_CONSTANTS.PATTERN.GET_ANOTHER_USER, { userId }),
      );
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
