import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserTypeEnum {
  ADMIN = 'admin',
  WORKER = 'worker',
  USER = 'user',
  COMPANY = 'company',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;
  // @Prop({ required: false })
  // otp: string;
  @Prop({ required: false })
  name: string;
  @Prop({ required: false })
  location: string;
  @Prop({ required: false, enum: UserTypeEnum })
  type: UserTypeEnum;
  @Prop({ required: false })
  password: string;
  @Prop({ required: false, type: Types.ObjectId, ref: 'Restaurant' })
  restaurantId: Types.ObjectId;
  @Prop({ required: false, type: Types.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
