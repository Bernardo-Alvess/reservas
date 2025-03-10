import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AddressDto } from 'src/common/dto/AddressDto';
import { WorkHoursDto } from './dto/WorkHoursDto';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;
  @Prop({ type: AddressDto })
  address: AddressDto;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  maxClients: number;
  @Prop({ required: true, type: [WorkHoursDto] })
  workHours: WorkHoursDto[];
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;
  @Prop({ required: true })
  isActive: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
