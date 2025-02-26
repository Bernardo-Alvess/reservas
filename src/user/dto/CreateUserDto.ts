import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'O email fornecido é inválido' })
  email: string;
}
