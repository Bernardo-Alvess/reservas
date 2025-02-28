import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Email do usuário",
    example: "exemplo@email.com",
  })
  @IsEmail({}, { message: "O email fornecido é inválido" })
  email: string;
}
