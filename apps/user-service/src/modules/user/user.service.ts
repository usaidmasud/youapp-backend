import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { CreateProfileDto } from '@apps/api-gateway/src/modules/profile/dto/create-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(payload: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      $or: [{ username: payload.username }, { email: payload.email }],
    });

    if (existingUser) {
      throw new RpcException({
        message: 'Username or email already exists',
        code: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await new this.userModel({
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
    }).save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user.toObject();
    return result;
  }

  async validateUser(usernameOrEmail: string, password: string) {
    const user = await this.findUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new RpcException({
        message: 'User not found',
        code: 404,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new RpcException({
        message: 'Invalid password',
        code: 401,
      });
    }
    return user;
  }

  async findUserByUsernameOrEmail(usernameOrEmail: string) {
    return await this.userModel
      .findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      })
      .lean()
      .exec();
  }

  async findUserById(userId: string) {
    return await this.userModel.findById(userId).lean().exec();
  }

  async updateProfile(payload: CreateProfileDto) {
    await this.userModel.updateOne({ _id: payload.userId }, payload);
    return await this.userModel.findOne({ _id: payload.userId }).lean().exec();
  }

  async getAnotherUser(userId: string) {
    return await this.userModel
      .where({ _id: { $ne: new Types.ObjectId(userId) } })
      .populate('profile')
      .lean()
      .exec();
  }
}
