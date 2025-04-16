import { Optional } from '@nestjs/common';
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTableDto {
  @IsNumber()
  number: number;
  @IsNumber()
  numberOfSeats: number;
  @IsBoolean()
  @Optional()
  @IsNotEmpty()
  isReserved: boolean;
  @IsMongoId()
  @Optional()
  @IsNotEmpty()
  currentReservation: string;
  @IsMongoId()
  @IsNotEmpty()
  restaurantId: string;
}
