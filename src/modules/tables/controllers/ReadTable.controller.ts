import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReadTableService } from '../services/ReadTable.service';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Tables')
@Controller('tables')
export class ReadTableController {
  constructor(private readonly readTableService: ReadTableService) {}

  @Get('/restaurant/:id/stats')
  @ApiOperation({
    summary: 'Estatísticas das mesas do restaurante',
    description: 'Retorna estatísticas sobre as mesas do restaurante',
  })
  @ApiParam({ name: 'id', description: 'ID do restaurante' })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas das mesas',
    schema: {
      example: {
        totalTables: 20,
        blockedTables: 3,
        tablesWithReservations: 12,
        availableTables: 17,
      },
    },
  })
  async getTableStats(@Param('id') restaurantId: string) {
    return await this.readTableService.getTableStats(restaurantId);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Retorna uma mesa específica',
    description: 'Retorna uma mesa específica de um restaurante',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da mesa',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Mesa retornada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Mesa não encontrada' })
  async getTable(@Param('id') id: string) {
    return await this.readTableService.getTable(id);
  }

  @Get('/list/:id')
  @ApiOperation({
    summary: 'Listar mesas do restaurante',
    description:
      'Retorna todas as mesas de um restaurante, com opção de filtrar por disponibilidade',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do restaurante',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiQuery({
    name: 'isReserved',
    required: false,
    description: 'Filtrar mesas por status de reserva',
    type: Boolean,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de mesas retornada com sucesso',
    schema: {
      example: [
        {
          tableNumber: 1,
          numberOfSeats: 4,
          isReserved: false,
          restaurantId: '507f1f77bcf86cd799439011',
        },
      ],
    },
  })
  @ApiResponse({ status: 404, description: 'Restaurante não encontrado' })
  async getAllTables(
    @Param('id') restaurantId: string,
    @Query('isReserved') isReserved: boolean,
  ) {
    return await this.readTableService.listTables(restaurantId, isReserved);
  }
}
