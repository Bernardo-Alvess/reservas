import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AddressDto } from 'src/common/dto/AddressDto';
import { WorkHoursDto } from './dto/WorkHoursDto';

export type RestaurantDocument = HydratedDocument<Restaurant>;

export class ProfileImageDto {
  url: string;
  publicId: string;
}

export class MenuDto {
  url: string;
  publicId: string;
}

export class GalleryDto {
  url: string;
  publicId: string;
}

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
  @Prop({ required: false })
  maxReservationTime: number;
  @Prop({ required: true, type: [WorkHoursDto] })
  workHours: WorkHoursDto[];
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;
  @Prop({ required: true, default: true })
  isActive: boolean;
  @Prop({ required: false })
  profileImage: ProfileImageDto;
  @Prop({ required: false })
  menu: MenuDto;
  @Prop({ required: false })
  gallery: GalleryDto[];
  @Prop({ required: false })
  qrCode: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
