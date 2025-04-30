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
@Controller('table')
export class ReadTableController {
  constructor(private readonly readTableService: ReadTableService) {}

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
