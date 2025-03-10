import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber } from 'class-validator';

export class UpdateCompanyDto {
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Empresa Exemplo LTDA',
  })
  @IsString()
  name: string;

  // @ApiProperty({
  //   description: 'Email da empresa',
  //   example: 'contato@empresa.com',
  // })
  // @IsEmail()
  // email: string;

  @ApiProperty({
    description: 'Telefone da empresa',
    example: '(11) 99999-9999',
  })
  @IsPhoneNumber('BR')
  phone: string;
}
