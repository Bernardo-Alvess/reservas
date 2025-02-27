import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ReadUserService } from '../services/ReadUser.service';
import { UserGuard } from '../guard/user.guard';
import { CreateUserDto } from '../dto/CreateUserDto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserAuthMessages } from '../messages/UserAuthMessages';

@Controller('users')
export class ReadUserController {
  constructor(private readonly readUserService: ReadUserService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar usuários',
    description: 'Retorna uma lista com todos os usuários cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    schema: {
      example: [
        {
          email: 'user@example.com',
          otp: '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          name: 'User Name',
          location: 'São Paulo',
        },
      ],
    },
  })
  listUsers() {
    return this.readUserService.listUsers();
  }

  @Get('/find-user')
  @ApiOperation({
    summary: 'Buscar usuário por email',
    description: 'Retorna os dados de um usuário específico baseado no email',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: UserAuthMessages.USER_NOT_FOUND,
  })
  readUser(@Body() user: CreateUserDto) {
    return this.readUserService.findUserByEmail(user.email);
  }

  @UseGuards(UserGuard)
  @Get('/me')
  @ApiOperation({
    summary: 'Obter dados do usuário logado',
    description: 'Retorna os dados do usuário autenticado',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário retornados com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  getMe(@Req() request: Request) {
    return request['user'];
  }
}
