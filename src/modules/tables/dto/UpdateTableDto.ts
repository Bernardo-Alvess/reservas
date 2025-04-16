import { Optional } from '@nestjs/common';
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTableDto {
  @IsMongoId()
  _id: string;
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
}
