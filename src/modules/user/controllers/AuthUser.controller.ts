import { Body, Controller, Post } from '@nestjs/common';
import { ReadUserService } from '../services/ReadUser.service';
import { AuthUserService } from '../services/AuthUser.service';
import { AuthUserDto } from '../dto/LoginUserDto';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authService: AuthUserService) {}

  @Post('/login')
  login(@Body() user: AuthUserDto) {
    return this.authService.login(user);
  }
}
