import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReserveDocument = HydratedDocument<Reserve>;

@Schema({ timestamps: true })
export class Reserve {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  clientId: Types.ObjectId;
  @Prop({ required: true, type: Types.ObjectId, ref: 'Restaurant' })
  restaurantId: Types.ObjectId;
  @Prop({ required: true, default: false })
  clientConfirmed: boolean;
  @Prop({ required: true, default: false })
  restaurantConfirmed: boolean;
  @Prop({ required: true })
  date: string;
  @Prop({ required: true })
  time: string;
  @Prop({ required: false })
  tableNumber: string;
}

export const ReserveSchema = SchemaFactory.createForClass(Reserve);
