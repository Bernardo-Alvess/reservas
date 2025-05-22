import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CompanyAuthDto } from '../dto/CompanyAuthDto';
import { ReadCompanyRepository } from '../repositories/ReadCompanyRepository';
import { CompanyAuthMessages } from '../messages/CompanyMessages';
import * as bcrypt from 'bcrypt';
import { TokenCompanyJwtService } from '../guard/CompanyJwt.service';

@Injectable()
export class AuthCompanyService {
  constructor(
    private readonly readCompanyRepository: ReadCompanyRepository,
    private readonly tokenCompanyJwtService: TokenCompanyJwtService,
  ) {}

  async login(loginDto: CompanyAuthDto) {
    const company = await this.readCompanyRepository.findCompanyByEmail(
      loginDto.email,
    );

    if (!company)
      throw new UnauthorizedException(CompanyAuthMessages.COMPANY_NOT_FOUND);

    const isMatch = await bcrypt.compare(loginDto.password, company.password);

    if (!isMatch)
      throw new UnauthorizedException(
        CompanyAuthMessages.COMPANY_PASSWORD_NOT_MATCH,
      );

    const payload = {
      sub: company._id,
      email: company.email,
      type: 'company',
    };

    const sessionToken =
      await this.tokenCompanyJwtService.createSessionToken(payload);
    return {
      sessionToken,
    };
  }
}
