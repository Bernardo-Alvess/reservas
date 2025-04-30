import { Controller, Get, Param } from '@nestjs/common';
import { ReadReserveService } from '../service/ReadReserve.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('Reserve')
@Controller('reserve')
export class ReadReserveController {
  constructor(private readonly readReserveService: ReadReserveService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas as reservas',
    description: 'Retorna todas as reservas do sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reservas retornada com sucesso',
    schema: {
      example: [
        {
          clientId: '507f1f77bcf86cd799439011',
          restaurantId: '507f1f77bcf86cd799439012',
          startTime: '2024-03-20T19:00:00.000Z',
          endTime: '2024-03-20T21:00:00.000Z',
          amountOfPeople: 4,
        },
      ],
    },
  })
  async listReserves() {
    return this.readReserveService.listReserves();
  }

  @Get('/restaurant/:id')
  @ApiOperation({
    summary: 'Listar reservas por restaurante',
    description: 'Retorna todas as reservas de um restaurante específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do restaurante',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ status: 200, description: 'Lista de reservas do restaurante' })
  @ApiResponse({ status: 404, description: 'Restaurante não encontrado' })
  async findByRestaurantId(@Param('id') restaurantId: string) {
    return this.readReserveService.findByRestaurantId(restaurantId);
  }

  @Get('/client/:id')
  @ApiOperation({
    summary: 'Listar reservas por cliente',
    description: 'Retorna todas as reservas de um cliente específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ status: 200, description: 'Lista de reservas do cliente' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findByClientId(@Param('id') clientId: string) {
    return this.readReserveService.findByClientId(clientId);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Buscar reserva por ID',
    description: 'Retorna os detalhes de uma reserva específica',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da reserva',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({ status: 200, description: 'Detalhes da reserva' })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada' })
  async findReserveById(@Param('id') reserveId: string) {
    return this.readReserveService.findReserveById(reserveId);
  }
}
