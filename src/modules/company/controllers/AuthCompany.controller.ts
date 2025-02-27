import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CompanyAuthDto } from '../dto/CompanyAuthDto';
import { AuthCompanyService } from '../services/AuthCompany.service';
import { Response } from 'express';
import { CompanyAuthMessages } from '../messages/CompanyMessages';

@Controller('/auth-company')
export class AuthCompanyController {
  constructor(private readonly authCompanyService: AuthCompanyService) {}

  @Post('/login')
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
