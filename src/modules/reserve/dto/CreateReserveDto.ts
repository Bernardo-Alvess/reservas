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
  @IsOptional()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cpf: string;

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
