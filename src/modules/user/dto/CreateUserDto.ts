import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserTypeEnum } from '../user.schema';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'exemplo@email.com',
  })
  @IsEmail({}, { message: 'O email fornecido é inválido' })
  email: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Exemplo',
  })
  @IsString({ message: 'O nome fornecido é inválido' })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'Tipo de usuário',
    example: 'admin',
  })
  @IsEnum(UserTypeEnum, { message: 'O tipo de usuário fornecido é inválido' })
  @IsOptional()
  @IsNotEmpty()
  type?: UserTypeEnum = UserTypeEnum.USER;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  @IsString({ message: 'A senha fornecida é inválida' })
  @IsOptional()
  // @IsNotEmpty()
  password?: string;

  @ApiProperty({
    description: 'ID do restaurante',
    example: '60a0b0b0c0c0d0c0c0c0c0c0',
  })
  @IsString({ message: 'O ID do restaurante fornecido é inválido' })
  @IsOptional()
  @IsNotEmpty()
  restaurantId?: string;

  @ApiProperty({
    description: 'ID da empresa',
    example: '60a0b0b0c0c0d0c0c0c0c0c0',
  })
  @IsString({ message: 'O ID da empresa fornecido é inválido' })
  @IsOptional()
  @IsNotEmpty()
  companyId?: string;
}
