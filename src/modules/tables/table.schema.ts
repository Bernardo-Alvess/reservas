import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TableDocument = HydratedDocument<Table>;

@Schema()
export class Table {
  @Prop({ required: true })
  number: number;
  @Prop({ required: true })
  numberOfSeats: string;
  @Prop({ required: false, default: false })
  isReserved: boolean;
  @Prop({ required: false, type: Types.ObjectId, ref: 'Reserve' })
  currentReservation: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'Restaurant' })
  restaurantId: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);
