import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { AddressDto } from 'src/common/dto/AddressDto';
import { WorkHoursDto } from './WorkHoursDto';

export class CreateRestaurantDto {
  @ApiProperty({
    example: 'Restaurante do João',
    description: 'Nome do restaurante',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '(11) 99999-9999',
    description: 'Telefone do restaurante',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Endereço do restaurante',
    type: AddressDto,
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;

  @ApiProperty({
    example: 'Restaurante especializado em comida italiana',
    description: 'Descrição do restaurante',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Japonesa',
    description: 'Tipo de comida do restaurante',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: 50,
    description: 'Capacidade máxima de clientes',
  })
  @IsNumber()
  @IsNotEmpty()
  maxClients: number;

  @ApiProperty({
    type: [WorkHoursDto],
    description: 'Horários de funcionamento do restaurante',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkHoursDto)
  @IsNotEmpty()
  workHours: WorkHoursDto[];
}
