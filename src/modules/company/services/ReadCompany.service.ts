import { Injectable } from '@nestjs/common';
import { ReadCompanyRepository } from '../repositories/ReadCompanyRepository';

@Injectable()
export class ReadCompanyService {
  constructor(private readonly readCompanyRepository: ReadCompanyRepository) {}

  async listCompanies() {
    const companies = await this.readCompanyRepository.listCompanies();
    return companies;
  }

  async findByEmail(email: string) {
    const company = await this.readCompanyRepository.findCompanyByEmail(email);
    return company;
  }
}
