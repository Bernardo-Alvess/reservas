import { Body, Controller, Get } from '@nestjs/common';
import { UserCaseUserService } from '../services/UseCaseUser.service';
import { ReadUserService } from '../services/ReadUser.service';

@Controller('users')
export class ReadUserController {
  constructor(private readonly readUserService: ReadUserService) {}

  @Get()
  listUsers() {
    return this.readUserService.listUsers();
  }

  @Get('/find-user')
  readUser(@Body() { email }: { email: string }) {
    return this.readUserService.findUserByEmail(email);
  }
}
