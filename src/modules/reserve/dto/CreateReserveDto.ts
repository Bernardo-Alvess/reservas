import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsMongoId, IsDate, IsOptional, IsNumber } from 'class-validator';

export class CreateReserveDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startTime: Date;
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Date)
  endTime?: Date;
  @IsNumber()
  @IsNotEmpty()
  amountOfPeople: number;
}
