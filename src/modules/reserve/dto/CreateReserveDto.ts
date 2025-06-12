import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsDate,
  IsOptional,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class CreateReserveDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

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

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  notes: string;
}
