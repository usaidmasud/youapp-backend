import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileSchema } from './schemas/profile.schema';
import { UserSchema } from '../user/schemas/user.schema';
@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Profile', schema: ProfileSchema },
    ]),
  ],
})
export class ProfileModule {}
