import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { UseCaseCompanyService } from '../services/UseCaseCompany.service';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { CompanyGuard } from '../guard/company.guard';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { UpdateCompanyDto } from '../dto/UpdateCompanyDto';

@Controller('company')
export class UseCaseCompanyController {
  constructor(private readonly useCaseCompanyService: UseCaseCompanyService) {}

  @Post('/create')
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.useCaseCompanyService.createCompany(createCompanyDto);
  }

  @UseGuards(CompanyGuard)
  @Patch('/update')
  async updateCompany(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Cookies('sessionTokenR') sessionToken: string,
  ) {
    return this.useCaseCompanyService.updateCompany(
      updateCompanyDto,
      sessionToken,
    );
  }
}
