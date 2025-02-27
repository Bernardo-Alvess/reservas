import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CompanyAuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
