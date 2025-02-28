import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company, CompanyDocument } from "../company.schema";

@Injectable()
export class ReadCompanyRepository {
  @InjectModel(Company.name)
  private readonly companyModel: Model<CompanyDocument>;

  async findCompanyByCpnj(cnpj: string) {
    const company = await this.companyModel.findOne({ cnpj });
    return company;
  }

  async findCompanyByEmail(email: string) {
    const company = await this.companyModel.findOne({ email });
    return company;
  }

  async findCompanyById(id: string) {
    const company = await this.companyModel.findById(id);
    return company;
  }
}
