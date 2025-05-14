import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckinDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
