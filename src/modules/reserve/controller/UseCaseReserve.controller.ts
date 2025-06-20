import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
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
import { UserGuard } from 'src/modules/user/guard/user.guard';
import { Response } from 'express';
@ApiTags('Reserve')
@Controller('reserve')
export class UseCaseReserveController {
  constructor(
    private readonly useCaseReserveService: UseCaseReserveService,
    private readonly userJwtService: TokenUserJwtService,
  ) {}

  @Post()
  @UseGuards(UserGuard)
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
  async createReserve(
    @Body() reserve: CreateReserveDto,
    @Req() request: Request,
  ) {
    const clientId = request['user'].sub;
    return this.useCaseReserveService.createReserve(reserve, clientId);
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

  @Get('confirm/client/:id')
  async confirmReserveClient(@Param('id') id: string, @Res() res: Response) {
    await this.useCaseReserveService.confirmReserve(id, 'client');
    res.send(`
      <html>
        <head><title>Reserva Confirmada</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 40px;">
          <h1 style="color: green;">✅ Reserva confirmada com sucesso!</h1>
          <p>Obrigado por confirmar sua presença. Tenha uma ótima refeição! 🍽️</p>
        </body>
      </html>
    `);
    res.status(200);
  }

  @Get('cancel/client/:id')
  async cancelReserveClient(@Param('id') id: string, @Res() res: Response) {
    await this.useCaseReserveService.cancelReserve(id, 'client');
    res.send(`
      <html>
        <head><title>Reserva Confirmada</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 40px;">
          <h1 style="color: red;">❌ Reserva cancelada com sucesso!</h1>
          <p>Lamentamos que não possa comparecer. Esperamos que possa nos ver em outra ocasião! 🍽️</p>
        </body>
      </html>
    `);
    res.status(200);
  }

  @Patch('cancel/:type/:id')
  @ApiOperation({
    summary: 'Cancelar reserva',
    description: 'Cancela uma reserva',
  })
  @ApiParam({ name: 'id', description: 'ID da reserva' })
  @ApiParam({
    name: 'type',
    description: 'Tipo de cancelamento',
    enum: ['client', 'restaurant'],
  })
  async cancelReserve(
    @Param('id') id: string,
    @Param('type') type: 'client' | 'restaurant',
  ) {
    return await this.useCaseReserveService.cancelReserve(id, type);
  }
}
