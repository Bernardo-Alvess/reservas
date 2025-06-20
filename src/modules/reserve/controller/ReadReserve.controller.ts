import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ReadReserveService } from '../service/ReadReserve.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/modules/user/guard/user.guard';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { ReserveStatus } from '../reserve.schema';
@ApiTags('Reserve')
@Controller('reserve')
export class ReadReserveController {
  constructor(private readonly readReserveService: ReadReserveService) {}

  @Get('restaurant/:id/stats')
  @ApiOperation({
    summary: 'Buscar estatísticas de reservas por restaurante',
    description:
      'Retorna estatísticas de reservas para um restaurante específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do restaurante',
    example: '507f1f77bcf86cd799439011',
  })
  async getStatsByRestaurantId(
    @Param('id') restaurantId: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.readReserveService.getStatsByRestaurantId(
      restaurantId,
      startDate,
      endDate,
    );
  }

  @Get('/restaurant/:id')
  @ApiOperation({
    summary: 'Listar todas as reservas para o restaurante',
    description:
      'Retorna todas as reservas cadastradas no sistema para o restaurante',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do restaurante',
    example: '507f1f77bcf86cd799439011',
  })
  async listReservesByRestaurantId(
    @Param('id') restaurantId: string,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('status') status?: ReserveStatus,
    @Query('today') today?: boolean,
  ) {
    return this.readReserveService.listReservesByRestaurantId(
      restaurantId,
      pageOptionsDto,
      status,
      today,
    );
  }

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

  // @Get('/restaurant/:id')
  // @ApiOperation({
  //   summary: 'Listar reservas por restaurante',
  //   description: 'Retorna todas as reservas de um restaurante específico',
  // })
  // @ApiParam({
  //   name: 'id',
  //   description: 'ID do restaurante',
  //   example: '507f1f77bcf86cd799439011',
  // })
  // @ApiResponse({ status: 200, description: 'Lista de reservas do restaurante' })
  // @ApiResponse({ status: 404, description: 'Restaurante não encontrado' })
  // async findByRestaurantId(@Param('id') restaurantId: string) {
  //   return this.readReserveService.findByRestaurantId(restaurantId);
  // }

  @Get('/client')
  @ApiOperation({
    summary: 'Listar reservas por cliente',
    description: 'Retorna todas as reservas de um cliente específico',
  })
  @UseGuards(UserGuard)
  async findByClientId(
    @Req() req: Request,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('status') status?: ReserveStatus,
  ) {
    const id = req['user'].sub;
    console.log(id);
    return this.readReserveService.findByClientId(id, pageOptionsDto, status);
  }

  @Get('/restaurant/:id/upcoming')
  @ApiOperation({
    summary: 'Próximas reservas do restaurante',
    description: 'Retorna as próximas reservas do dia para o restaurante',
  })
  @ApiParam({ name: 'id', description: 'ID do restaurante' })
  @ApiResponse({ status: 200, description: 'Lista de próximas reservas' })
  async getUpcomingReservations(
    @Param('id') restaurantId: string,
    @Query('limit') limit?: number,
  ) {
    return this.readReserveService.getUpcomingReservations(
      restaurantId,
      limit || 10,
    );
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
