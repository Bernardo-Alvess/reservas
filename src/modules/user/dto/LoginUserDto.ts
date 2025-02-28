import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthUserDto {
  @ApiProperty({
    description: "Email do usuário",
    example: "exemplo@email.com",
  })
  @IsEmail({}, { message: "O email fornecido é inválido" })
  email: string;

  @ApiProperty({
    description: "OTP enviado ao usuário",
    example: "123456",
  })
  @Length(6, 6, { message: "A senha deve ter 6 caracteres" })
  @IsNotEmpty({ message: "A senha não pode ser vazia" })
  @IsString({ message: "A senha deve ser uma string" })
  otp: string;
}
