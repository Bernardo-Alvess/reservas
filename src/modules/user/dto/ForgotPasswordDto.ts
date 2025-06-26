import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email do usuário para reset de senha',
    example: 'usuario@exemplo.com',
  })
  @IsEmail({}, { message: 'O email fornecido é inválido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;
}
