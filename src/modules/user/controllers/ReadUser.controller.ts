import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ReadUserService } from '../services/ReadUser.service';
import { UserGuard } from '../guard/user.guard';
import { CreateUserDto } from '../dto/CreateUserDto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class ReadUserController {
  constructor(private readonly readUserService: ReadUserService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar usuários',
    description: 'Retorna todos os usuários cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários',
    schema: {
      example: [
        {
          email: 'user@example.com',
          name: 'User Name',
          location: 'São Paulo',
        },
      ],
    },
  })
  listUsers() {
    return this.readUserService.listUsers();
  }

  @Get('/restaurant/:restaurantId')
  @ApiOperation({
    summary: 'Buscar usuário por restaurante',
    description: 'Retorna os dados de um usuário específico',
  })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findByRestaurantId(@Param('restaurantId') restaurantId: string) {
    return this.readUserService.findByRestaurantId(restaurantId);
  }

  @Get('/find-user')
  @ApiOperation({
    summary: 'Buscar usuário por email',
    description: 'Retorna os dados de um usuário específico',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  readUser(@Body() user: CreateUserDto) {
    return this.readUserService.findUserByEmail(user.email);
  }

  @UseGuards(UserGuard)
  @Get('/me')
  @ApiOperation({
    summary: 'Perfil do usuário',
    description: 'Retorna os dados do usuário logado',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 200, description: 'Dados do usuário' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getMe(@Req() request: Request) {
    const email = request['user'].email;
    return this.readUserService.findUserByEmail(email);
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return this.readUserService.findUserById(id);
  }

  @Get('/restaurant/:restaurantId/stats')
  @ApiOperation({
    summary: 'Listar estatísticas de usuários por restaurante',
    description: 'Retorna as estatísticas de usuários por restaurante',
  })
  @ApiResponse({ status: 200, description: 'Estatísticas de usuários' })
  findUserByRestaurantIdAndStatus(@Param('restaurantId') restaurantId: string) {
    return this.readUserService.getUserStats(restaurantId);
  }
}
