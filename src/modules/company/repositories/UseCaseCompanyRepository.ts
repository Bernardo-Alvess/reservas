import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../company.schema';
import { Model } from 'mongoose';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { CreateCompanyMessages } from '../messages/CompanyMessages';
import { UpdateCompanyDto } from '../dto/UpdateCompanyDto';

@Injectable()
export class UseCaseCompanyRepository {
  @InjectModel(Company.name) private readonly companyModel: Model<Company>;

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const companyExists = await this.companyModel.findOne({
      email: createCompanyDto.email,
    });

    if (companyExists) {
      throw new ConflictException('Empresa já cadastrada');
    }

    const company = await this.companyModel.create(createCompanyDto);
    return company;
  }

  async updateCompany(updateCompanyDto: UpdateCompanyDto, _id: string) {
    return await this.companyModel.findByIdAndUpdate(_id, updateCompanyDto, {
      new: true,
    });
  }
}
