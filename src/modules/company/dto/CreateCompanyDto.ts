import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto {
  @ApiProperty({
    description: "Nome da empresa",
    example: "Empresa Exemplo LTDA",
  })
  name: string;

  @ApiProperty({
    description: "Email da empresa",
    example: "contato@empresa.com",
  })
  email: string;

  @ApiProperty({
    description: "CNPJ da empresa",
    example: "12.345.678/0001-90",
  })
  cnpj: string;

  @ApiProperty({
    description: "Senha da empresa",
    example: "senha123",
  })
  password: string;

  @ApiProperty({
    description: "Confirmação da senha",
    example: "senha123",
  })
  confirmPassword: string;

  @ApiProperty({
    description: "Telefone da empresa",
    example: "(11) 99999-9999",
  })
  phone: string;
}
