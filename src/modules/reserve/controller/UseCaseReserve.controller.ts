import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UseCaseReserveService } from '../service/UseCaseReserve.service';
import { CreateReserveDto } from '../dto/CreateReserveDto';
import { TokenUserJwtService } from 'src/modules/user/guard/UserJwt.service';
import { AssignTableDto } from '../dto/AssignTableDto';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
@ApiTags('Reserve')
@Controller('reserve')
export class UseCaseReserveController {
  constructor(
    private readonly useCaseReserveService: UseCaseReserveService,
    private readonly userJwtService: TokenUserJwtService,
  ) {}

  @Post()
  // @UseGuards(UserGuard)
  @ApiOperation({
    summary: 'Criar reserva',
    description: 'Cria uma nova reserva para um usuário',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateReserveDto })
  @ApiResponse({
    status: 201,
    description: 'Reserva criada com sucesso',
    schema: {
      example: {
        restaurantId: '507f1f77bcf86cd799439011',
        startTime: '2024-03-20T19:00:00.000Z',
        endTime: '2024-03-20T21:00:00.000Z',
        amountOfPeople: 4,
        cpf: '12345678901',
        birthDate: '01/01/1990',
      },
    },
  })
  async createReserve(@Body() reserve: CreateReserveDto) {
    return this.useCaseReserveService.createReserve(reserve);
  }

  @Post('assign-table')
  @ApiOperation({
    summary: 'Atribuir mesa',
    description: 'Atribui uma mesa a uma reserva',
  })
  @ApiBody({ type: AssignTableDto })
  @ApiResponse({ status: 200, description: 'Mesa atribuída com sucesso' })
  async assignTable(@Body() assignTableDto: AssignTableDto) {
    return await this.useCaseReserveService.assignTable(assignTableDto);
  }

  @Patch('confirm/:type/:id')
  @ApiOperation({
    summary: 'Confirmar reserva',
    description: 'Confirma uma reserva',
  })
  @ApiParam({ name: 'id', description: 'ID da reserva' })
  @ApiParam({
    name: 'type',
    description: 'Tipo de confirmação',
    enum: ['client', 'restaurant'],
  })
  async confirmReserve(
    @Param('id') id: string,
    @Param('type') type: 'client' | 'restaurant',
  ) {
    return await this.useCaseReserveService.confirmReserve(id, type);
  }
}
