import { Controller, Get, Param } from '@nestjs/common';
import { ReadRestaurantService } from '../services/ReadRestaurant.service';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Restaurant')
@Controller('restaurant')
export class ReadRestaurantController {
  constructor(private readonly readRestaurantService: ReadRestaurantService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os restaurantes',
    description: 'Retorna todos os restaurantes cadastrados no sistema',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'Lista de restaurantes retornada com sucesso',
    schema: {
      example: [
        {
          name: 'Restaurante Exemplo',
          phone: '(11) 99999-9999',
          address: {
            street: 'Rua Exemplo',
            number: '123',
            city: 'São Paulo',
          },
        },
      ],
    },
  })
  async listRestaurants() {
    return this.readRestaurantService.listAll();
  }

  @Get(':restaurantId')
  @ApiOperation({
    summary: 'Buscar restaurante por ID',
    description: 'Retorna os detalhes de um restaurante específico',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'restaurantId',
    description: 'ID do restaurante',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ status: 200, description: 'Detalhes do restaurante' })
  @ApiResponse({ status: 404, description: 'Restaurante não encontrado' })
  async findRestaurantById(@Param('restaurantId') restaurantId: string) {
    return this.readRestaurantService.findRestaurantById(restaurantId);
  }
}
