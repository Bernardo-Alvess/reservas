import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CompanyAuthDto } from '../dto/CompanyAuthDto';
import { AuthCompanyService } from '../services/AuthCompany.service';
import { Response } from 'express';
import { CompanyAuthMessages } from '../messages/CompanyMessages';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Company')
@Controller('/auth-company')
export class AuthCompanyController {
  constructor(private readonly authCompanyService: AuthCompanyService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Login de empresa',
    description: 'Autentica uma empresa',
  })
  @ApiBody({ type: CompanyAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    schema: {
      example: {
        message: 'Login realizado com sucesso',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: CompanyAuthMessages.COMPANY_PASSWORD_NOT_MATCH,
  })
  @ApiResponse({
    status: 404,
    description: CompanyAuthMessages.COMPANY_NOT_FOUND,
  })
  async login(@Body() loginDto: CompanyAuthDto, @Res() response: Response) {
    const { sessionToken } = await this.authCompanyService.login(loginDto);

    response.cookie('sessionTokenR', sessionToken, {
      maxAge: 15 * 60 * 1000,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain:
        process.env.NODE_ENV === 'production'
          ? process.env.COOKIES_PATH
          : 'localhost',
    });

    return response.status(HttpStatus.OK).json({
      message: CompanyAuthMessages.LOGIN_SUCCESS,
    });
  }
}
