import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenDto {
  @ApiProperty({
    description: 'Token de reset de senha para validação',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString({ message: 'O token deve ser uma string' })
  @IsNotEmpty({ message: 'O token é obrigatório' })
  token: string;
}
