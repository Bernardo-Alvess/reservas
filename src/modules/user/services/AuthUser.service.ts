import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ReadUserRepository } from '../repositories/ReadUserRepository';
import { AuthUserDto } from '../dto/LoginUserDto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUserService {
  constructor(private readonly readUserRepository: ReadUserRepository) {}

  async login(user: AuthUserDto) {
    const isUser = await this.readUserRepository.findByEmail(user.email);

    if (!isUser) throw new NotFoundException('Usuário não encontrado.');

    const isMatch = await bcrypt.compare(user.otp, isUser.otp);

    if (!isMatch) throw new UnauthorizedException('Credenciais Inválidas.');

    return true;
  }
}
