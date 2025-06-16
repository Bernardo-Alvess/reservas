import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UserCaseUserService } from '../services/UseCaseUser.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserTypeEnum } from '../user.schema';
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
    console.log(createUserDto);
    return this.userUseCaseService.createUser(createUserDto);
  }

  @Patch('/:userId/status')
  @ApiOperation({
    summary: 'Troca o status do usuário',
    description: 'Troca o status do usuário para false',
  })
  changeStatusUser(@Param('userId') userId: string) {
    return this.userUseCaseService.changeStatusUser(userId);
  }

  @Patch('/:userId/role')
  @ApiOperation({
    summary: 'Troca o tipo de usuário',
    description: 'Troca o tipo de usuário para admin ou worker',
  })
  @ApiBody({ type: CreateUserDto })
  changeRoleUser(
    @Param('userId') userId: string,
    @Body() body: { type: UserTypeEnum },
  ) {
    return this.userUseCaseService.changeRoleUser(userId, body.type);
  }

  @Delete('/:userId')
  @ApiOperation({
    summary: 'Deleta um usuário',
    description: 'Deleta um usuário',
  })
  deleteUser(@Param('userId') userId: string) {
    return this.userUseCaseService.deleteUser(userId);
  }
}
