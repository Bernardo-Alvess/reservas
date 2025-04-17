import { Optional } from '@nestjs/common';
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTableDto {
  @IsNumber()
  tableNumber: number;
  @IsNumber()
  numberOfSeats: number;
  @IsBoolean()
  @Optional()
  @IsNotEmpty()
  isReserved: boolean;
  @IsMongoId()
  @IsOptional()
  @IsNotEmpty()
  currentReservation: string;
  @IsMongoId()
  @IsNotEmpty()
  restaurantId: string;
}
