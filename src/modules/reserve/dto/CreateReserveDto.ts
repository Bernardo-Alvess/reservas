import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

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
