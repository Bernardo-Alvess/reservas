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
  startTime: Date;
  @Prop({ required: true })
  endTime: Date;
  @Prop({ required: false })
  tableNumber: number;
  @Prop({ required: true })
  amountOfPeople: number;
  @Prop({ required: false, type: Types.ObjectId, ref: 'Table' })
  tableId: Types.ObjectId;
}

export const ReserveSchema = SchemaFactory.createForClass(Reserve);

ReserveSchema.index({ tableId: 1, startTime: 1, endTime: 1 });
