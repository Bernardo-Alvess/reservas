import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CompanyGuard } from 'src/modules/company/guard/company.guard';
import { ReadRestaurantService } from '../services/ReadRestaurant.service';
import { QrCodeService } from '../services/QrCode.service';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { UseCaseRestaurantService } from '../services/UseCaseRestaurant.service';
@ApiTags('Restaurant')
@UseGuards(CompanyGuard)
@Controller('restaurant')
export class ReadRestaurantController {
  constructor(
    private readonly readRestaurantService: ReadRestaurantService,
    private readonly qrCodeService: QrCodeService,
    private readonly useCaseRestaurantService: UseCaseRestaurantService,
  ) {}

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

  @Get(':restaurantId/qrcode')
  @ApiOperation({
    summary: 'Obter QR Code do restaurante',
    description: 'Retorna o QR Code para check-in do restaurante especificado',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'restaurantId',
    description: 'ID do restaurante',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'QR Code do restaurante',
    schema: {
      example: {
        qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Restaurante não encontrado' })
  async getRestaurantQrCode(@Param('restaurantId') restaurantId: string) {
    const restaurant =
      await this.readRestaurantService.findRestaurantById(restaurantId);

    if (restaurant && restaurant.qrCodeUrl) {
      return { qrCodeUrl: restaurant.qrCodeUrl };
    }

    // Se o restaurante não tiver QR code, gerar um novo
    const qrCodeUrl =
      await this.qrCodeService.generateQrCodeForRestaurant(restaurantId);
    const updatedRestaurant =
      await this.useCaseRestaurantService.updateQrCodeUrl(
        qrCodeUrl,
        restaurantId,
      );
    return { qrCodeUrl: updatedRestaurant.qrCodeUrl };
  }
}
