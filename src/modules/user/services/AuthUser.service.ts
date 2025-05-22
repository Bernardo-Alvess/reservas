import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReadUserRepository } from '../repositories/ReadUserRepository';
import { AuthUserDto } from '../dto/LoginUserDto';

import * as bcrypt from 'bcrypt';
import { UserAuthMessages } from '../messages/UserAuthMessages';
import { TokenUserJwtService } from '../guard/UserJwt.service';
import { UserTypeEnum } from '../user.schema';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly readUserRepository: ReadUserRepository,
    private readonly tokenUserJwtService: TokenUserJwtService,
  ) {}

  async login(user: AuthUserDto) {
    const isUser = await this.readUserRepository.findByEmail(user.email);

    if (!isUser) throw new NotFoundException(UserAuthMessages.USER_NOT_FOUND);

    const isClient = isUser.type === UserTypeEnum.USER;
    const isMatch = await bcrypt.compare(user.password, isUser.password);

    if (!isMatch)
      throw new UnauthorizedException(UserAuthMessages.INVALID_CREDENTIALS);

    const payload = {
      sub: isUser._id,
      email: isUser.email,
      type: isUser.type || UserTypeEnum.USER,
    };

    const sessionToken =
      await this.tokenUserJwtService.createSessionToken(payload);

    return { sessionToken, isClient };
  }
}
