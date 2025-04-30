import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UseCaseTableService } from '../services/UseCaseTable.service';
import { CreateTableDto } from '../dto/CreateTableDto';
import { UpdateTableDto } from '../dto/UpdateTableDto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Tables')
@Controller('table')
export class UseCaseTableController {
  constructor(private readonly useCaseTableService: UseCaseTableService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar mesa',
    description: 'Cria uma nova mesa no restaurante',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateTableDto })
  @ApiResponse({
    status: 201,
    description: 'Mesa criada com sucesso',
    schema: {
      example: {
        tableNumber: 1,
        numberOfSeats: 4,
        restaurantId: '507f1f77bcf86cd799439011',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Restaurante não encontrado' })
  async createTable(@Body() CreateTableDto: CreateTableDto) {
    return await this.useCaseTableService.createTable(CreateTableDto);
  }

  @Patch()
  @ApiOperation({
    summary: 'Atualizar mesa',
    description: 'Atualiza os dados de uma mesa existente',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateTableDto })
  @ApiResponse({
    status: 200,
    description: 'Mesa atualizada com sucesso',
    schema: {
      example: {
        tableNumber: 1,
        numberOfSeats: 6,
        isReserved: true,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Mesa não encontrada' })
  async updateTable(@Body() UpdateTableDto: UpdateTableDto) {
    return await this.useCaseTableService.updateTable(UpdateTableDto);
  }
}
