import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateTableDto {
  @IsNumber()
  @IsOptional()
  tableNumber?: number;
  @IsNumber()
  @IsOptional()
  numberOfSeats?: number;
  @IsBoolean()
  @IsOptional()
  isReserved?: boolean;
}
