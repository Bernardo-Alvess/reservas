import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UserCaseUserService } from '../services/UseCaseUser.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UseCaseUserController {
  constructor(private readonly userUseCaseService: UserCaseUserService) {}

  @Post('/create-user')
  @ApiOperation({
    summary: 'Criar novo usuário',
    description:
      'Cria um novo usuário e gera um OTP (senha temporária) de 6 dígitos',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        email: 'user@example.com',
        otp: '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userUseCaseService.createUser(createUserDto);
  }
}
