import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UseCaseCompanyRepository } from "../repositories/UseCaseCompanyRepository";
import { CreateCompanyDto } from "../dto/CreateCompanyDto";
import {
  CompanyAuthMessages,
  CreateCompanyMessages,
} from "../messages/CompanyMessages";
import * as bcrypt from "bcrypt";
import { ReadCompanyRepository } from "../repositories/ReadCompanyRepository";
import { UpdateCompanyDto } from "../dto/UpdateCompanyDto";
import { TokenCompanyJwtService } from "../guard/CompanyJwt.service";
@Injectable()
export class UseCaseCompanyService {
  constructor(
    private readonly useCaseCompanyRepository: UseCaseCompanyRepository,
    private readonly readCompanyRepository: ReadCompanyRepository,
    private readonly companyJwtService: TokenCompanyJwtService,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    if (createCompanyDto.confirmPassword !== createCompanyDto.password) {
      throw new BadRequestException(
        CreateCompanyMessages.COMPANY_PASSWORD_NOT_MATCH,
      );
    }

    const companyExists = await this.readCompanyRepository.findCompanyByCpnj(
      createCompanyDto.cnpj,
    );
    if (companyExists)
      throw new ConflictException(CreateCompanyMessages.COMPANY_ALREADY_EXISTS);

    const pass = bcrypt.hashSync(
      createCompanyDto.password,
      await bcrypt.genSalt(),
    );

    const company = await this.useCaseCompanyRepository.createCompany({
      ...createCompanyDto,
      password: pass,
    });
    return company;
  }

  async updateCompany(
    updateCompanyDto: UpdateCompanyDto,
    sessionToken: string,
  ) {
    /**
     * func para o payload
     * const _id = payload.sub
     * const company = await this.readCompanyRepository.findCompanyById(_id)
     * 
     * if(!company) throw new UnauthorizedException(CompanyAuthMessages.COMPANY_NOT_FOUND)
     
    return this.useCaseCompanyRepository.updateCompany(updateCompanyDto, _id)
    */

    const payload =
      await this.companyJwtService.checkSessionToken(sessionToken);
    const _id = payload.sub;

    const company = await this.readCompanyRepository.findCompanyById(_id);
    if (!company)
      throw new UnauthorizedException(CompanyAuthMessages.COMPANY_NOT_FOUND);

    return await this.useCaseCompanyRepository.updateCompany(
      updateCompanyDto,
      _id,
    );
  }
}
