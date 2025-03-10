import { IsMongoId, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export class CreateReserveDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string;
  @IsString()
  @IsNotEmpty()
  date: string;
  @IsString()
  @IsNotEmpty()
  time: string;
}
