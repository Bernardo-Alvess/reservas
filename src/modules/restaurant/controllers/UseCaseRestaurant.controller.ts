import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { UseCaseRestaurantService } from '../services/UseCaseRestaurant.service';
import { CreateRestaurantDto } from '../dto/CreateRestaurantDto';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { CloudinaryService } from '../services/Cloudinary.service';
import { UserGuard } from 'src/modules/user/guard/user.guard';
import { ReadRestaurantService } from '../services/ReadRestaurant.service';

@ApiTags('Restaurant')
@UseGuards(UserGuard)
@Controller('restaurant')
export class UseCaseRestaurantController {
  constructor(
    private readonly useCaseRestaurantService: UseCaseRestaurantService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly readRestaurantService: ReadRestaurantService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar restaurante',
    description: 'Cria um novo restaurante',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateRestaurantDto })
  @ApiResponse({
    status: 201,
    description: 'Restaurante criado com sucesso',
    schema: {
      example: {
        name: 'Restaurante Exemplo',
        phone: '(11) 99999-9999',
        address: {
          street: 'Rua Exemplo',
          number: '123',
          city: 'São Paulo',
        },
      },
    },
  })
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Cookies('sessionToken') sessionToken: string,
  ) {
    return await this.useCaseRestaurantService.createRestaurant(
      createRestaurantDto,
      sessionToken,
    );
  }

  @Patch('/:restaurantId')
  @ApiOperation({
    summary: 'Atualizar restaurante',
    description: 'Atualiza os dados de um restaurante existente',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'restaurantId',
    description: 'ID do restaurante',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: CreateRestaurantDto })
  @ApiResponse({
    status: 200,
    description: 'Restaurante atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Restaurante não encontrado' })
  async updateRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Body() updateRestaurantDto: CreateRestaurantDto,
  ) {
    return await this.useCaseRestaurantService.updateRestaurant(
      restaurantId,
      updateRestaurantDto,
    );
  }
}
