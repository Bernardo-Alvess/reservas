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
import { ReadCompanyService } from 'src/modules/company/services/ReadCompany.service';
import { UserCaseUserService } from './UseCaseUser.service';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly readUserRepository: ReadUserRepository,
    private readonly tokenUserJwtService: TokenUserJwtService,
    private readonly readCompanyService: ReadCompanyService,
    private readonly useCaseUserService: UserCaseUserService,
  ) {}

  async login(user: AuthUserDto) {
    const isUser = await this.readUserRepository.findByEmail(user.email);

    if (!isUser) throw new NotFoundException(UserAuthMessages.USER_NOT_FOUND);
    if (!isUser?.active)
      throw new UnauthorizedException(UserAuthMessages.USER_NOT_ACTIVE);
    const isClient = isUser.type === UserTypeEnum.USER;
    const isMatch = await bcrypt.compare(user.password, isUser.password);

    if (!isMatch) {
      throw new UnauthorizedException(UserAuthMessages.INVALID_CREDENTIALS);
    }

    let companyId = null;
    if (isUser.type === UserTypeEnum.COMPANY) {
      const isCompany = await this.readCompanyService.findByEmail(isUser.email);
      companyId = isCompany._id.toString();
    }

    if (isUser.type === UserTypeEnum.USER) {
      await this.useCaseUserService.removePassword(isUser._id.toString());
    }

    const payload = {
      sub: isUser._id.toString(),
      email: isUser.email,
      type: isUser.type || UserTypeEnum.USER,
      companyId,
    };

    const sessionToken =
      await this.tokenUserJwtService.createSessionToken(payload);

    return { sessionToken, isClient };
  }
}
