import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthUserService } from '../services/AuthUser.service';
import { AuthUserDto } from '../dto/LoginUserDto';
import { Response } from 'express';
import { UserGuard } from '../guard/user.guard';
import { UserAuthMessages } from '../messages/UserAuthMessages';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Users')
@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authService: AuthUserService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Login de usuário',
    description: 'Autentica um usuário usando email e OTP',
  })
  @ApiBody({ type: AuthUserDto })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async login(@Body() user: AuthUserDto, @Res() response: Response) {
    const { sessionToken } = await this.authService.login(user);

    response.cookie('sessionToken', sessionToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain:
        process.env.NODE_ENV === 'production'
          ? process.env.PRODUCTION_URL
          : 'localhost',
    });
    return response.status(HttpStatus.OK).json({
      message: UserAuthMessages.LOGIN_SUCCESS,
    });
  }

  @UseGuards(UserGuard)
  @Get('/logout')
  @ApiOperation({
    summary: 'Logout de usuário',
    description: 'Realiza o logout do usuário removendo o cookie de sessão',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'Logout realizado com sucesso',
    schema: {
      example: {
        message: UserAuthMessages.LOGOUT_SUCCESS,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async logout(@Res() response: Response) {
    response.clearCookie('sessionToken', {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain:
        process.env.NODE_ENV === 'production'
          ? process.env.PRODUCTION_URL
          : 'localhost',
    });

    return response.status(HttpStatus.OK).json({
      message: UserAuthMessages.LOGOUT_SUCCESS,
    });
  }
}
