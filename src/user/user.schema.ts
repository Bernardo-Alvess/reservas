import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;
  @Prop({ required: false })
  otp: string;
  @Prop({ required: false })
  name: string;
  @Prop({ required: false })
  location: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
