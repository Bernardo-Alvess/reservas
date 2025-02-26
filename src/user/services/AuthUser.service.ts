import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReadUserRepository } from '../repositories/ReadUserRepository';
import { AuthUserDto } from '../dto/LoginUserDto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUserService {
  constructor(private readonly readUserRepository: ReadUserRepository) {}

  async login(user: AuthUserDto) {
    const isUser = await this.readUserRepository.findByEmail(user.email);

    if (!isUser) return new Error('User not found');

    const isMatch = await bcrypt.compare(user.otp, isUser.otp);

    if (!isMatch) return new UnauthorizedException();

    return true;
  }
}
