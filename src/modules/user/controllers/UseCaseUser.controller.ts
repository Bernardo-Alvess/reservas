import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UserCaseUserService } from '../services/UseCaseUser.service';

@Controller('users')
export class UseCaseUserController {
  constructor(private readonly userUseCaseService: UserCaseUserService) {}

  @Post('/create-user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userUseCaseService.createUser(createUserDto);
  }
}
