import { CreateProfileDto } from '@apps/api-gateway/src/modules/profile/dto/create-profile.dto';
import { GetAstrologyDto } from '@apps/api-gateway/src/modules/profile/dto/get-astrology.dto';
import { HOROSCOPE_CONSTANT } from '@commons/utils/constants/horoscope.constant';
import { ZODIAC_CONSTANT } from '@commons/utils/constants/zodiac.constant';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createProfile(payload: CreateProfileDto) {
    // check profile exist
    const profileExist = await this.profileModel.findOne({
      user: new Types.ObjectId(payload.userId),
    });
    if (profileExist) {
      throw new RpcException({
        message: 'Profile already exists',
        code: 409,
      });
    }
    const createdProfile = await this.profileModel.create({
      ...payload,
      user: new Types.ObjectId(payload.userId),
    });
    // update user
    await this.userModel.updateOne(
      { _id: payload.userId },
      {
        profile: createdProfile._id,
      },
    );
    return createdProfile;
  }

  async getProfile(userId: string) {
    const user = await this.userModel
      .where({ _id: new Types.ObjectId(userId) })
      .populate('profile')
      .findOne()
      .select('-password')
      .lean()
      .exec();
    if (!user) {
      throw new RpcException({
        message: 'User not found',
        code: 404,
      });
    }
    return user;
  }

  async updateProfile(payload: CreateProfileDto) {
    const findProfile = await this.profileModel.findOne({
      user: new Types.ObjectId(payload.userId),
    });
    if (!findProfile) {
      throw new RpcException({
        message: 'Profile not found',
        code: 404,
      });
    }
    await this.profileModel.updateOne(
      { _id: findProfile._id },
      {
        ...payload,
        user: new Types.ObjectId(payload.userId),
      },
    );
    // update user
    await this.userModel.updateOne(
      { _id: payload.userId },
      {
        profile: findProfile._id,
      },
    );
    return this.profileModel.findById(findProfile._id);
  }

  async getHoroscope(payload: GetAstrologyDto) {
    const birthDate = new Date(payload.birthDate);
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    const horoscopes = HOROSCOPE_CONSTANT.find((sign) => {
      const signStartDate = new Date(sign.startDate);
      const signEndDate = new Date(sign.endDate);
      return (
        (month === signStartDate.getMonth() + 1 &&
          day >= signStartDate.getDate()) ||
        (month === signEndDate.getMonth() + 1 && day <= signEndDate.getDate())
      );
    });
    if (!horoscopes) {
      return 'Horoscope not found';
    }
    return horoscopes.sign;
  }

  async getAstrology(payload: GetAstrologyDto) {
    const horoscopes = await this.getHoroscope(payload);
    const zodiac = await this.getZodiac(payload);
    return { horoscopes, zodiac };
  }

  async getZodiac(payload: GetAstrologyDto) {
    const birthDate = new Date(payload.birthDate);

    const sign = ZODIAC_CONSTANT.find((sign) => {
      const signStartDate = new Date(sign.startDate);
      const signEndDate = new Date(sign.endDate);
      return birthDate >= signStartDate && birthDate <= signEndDate;
    });
    if (!sign) {
      return 'Zodiac not found';
    }
    return sign.sign;
  }
}
