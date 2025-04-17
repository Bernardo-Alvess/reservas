import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsMongoId, IsDate, IsOptional } from 'class-validator';

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
}
