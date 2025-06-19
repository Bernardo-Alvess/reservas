import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReserveDocument = HydratedDocument<Reserve>;

export enum ReserveStatus {
  PENDING = 'Pendente',
  CONFIRMED = 'Confirmada',
  CANCELLED = 'Cancelada',
}

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
  @Prop({ required: true, enum: ReserveStatus, default: ReserveStatus.PENDING })
  status: ReserveStatus;
  @Prop({
    required: false,
    enum: ['user', 'restaurant', 'system'],
    default: null,
  })
  canceledBy?: 'user' | 'restaurant' | 'system';
  @Prop({ required: false })
  canceledAt?: Date;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: false, type: String })
  notes: string;
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: false, type: Date })
  checkedInAt?: Date;
  @Prop({ required: false, type: Boolean })
  checkedIn?: boolean;
}

export const ReserveSchema = SchemaFactory.createForClass(Reserve);

ReserveSchema.index({ tableId: 1, startTime: 1, endTime: 1 });
