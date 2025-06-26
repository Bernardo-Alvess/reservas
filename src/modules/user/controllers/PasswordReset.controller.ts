import { Body, Controller, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserCaseUserService } from '../services/UseCaseUser.service';
import { ForgotPasswordDto } from '../dto/ForgotPasswordDto';
import { ResetPasswordDto } from '../dto/ResetPasswordDto';
import { AuthUserService } from '../services/AuthUser.service';

@ApiTags('Password Reset')
@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly userCaseUserService: UserCaseUserService,
    private readonly authService: AuthUserService,
  ) {}

  @Post('/forgot-password')
  @ApiOperation({
    summary: 'Solicitar reset de senha',
    description: 'Envia um email com link para reset de senha',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Email de reset enviado com sucesso',
    schema: {
      example: {
        message: 'Email de redefinição de senha enviado com sucesso!',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário não encontrado',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.userCaseUserService.createToken(forgotPasswordDto.email);
  }

  @Post('/reset-password/:token')
  @ApiOperation({
    summary: 'Redefinir senha',
    description: 'Redefine a senha do usuário usando o token válido',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Senha redefinida com sucesso',
    schema: {
      example: {
        message: 'Senha redefinida com sucesso!',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Token inválido ou expirado',
  })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    return await this.userCaseUserService.resetPasswordWithToken(
      token,
      resetPasswordDto.newPassword,
    );
  }
}
