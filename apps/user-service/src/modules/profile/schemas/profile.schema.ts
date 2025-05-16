import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: false, default: null })
  birthDate: string;

  @Prop({ required: false, default: null })
  name: string;

  @Prop({ required: false, default: null })
  height: number;

  @Prop({ required: false, default: null })
  weight: number;

  @Prop({ required: false, default: null })
  gender: string;

  @Prop({ required: false, default: null })
  horoscope: string;

  @Prop({ required: false, default: null })
  zodiac: string;

  @Prop({ required: false, default: null })
  interests: string[];

  @Prop({ required: false, default: null })
  imageUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
