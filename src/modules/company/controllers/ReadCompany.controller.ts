import { Controller, Get } from '@nestjs/common';
import { ReadCompanyService } from '../services/ReadCompany.service';

@Controller('company')
export class ReadCompanyController {
  constructor(private readonly readCompanyService: ReadCompanyService) {}

  @Get()
  async listCompanies() {
    return this.readCompanyService.listCompanies();
  }
}
