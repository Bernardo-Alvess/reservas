import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class AuthUserDto {
  @IsEmail({}, { message: 'O email fornecido é inválido' })
  email: string;

  @Length(6, 6, { message: 'A senha deve ter 6 caracteres' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @IsString({ message: 'A senha deve ser uma string' })
  otp: string;
}
