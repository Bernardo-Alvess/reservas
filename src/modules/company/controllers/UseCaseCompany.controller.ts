import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { UseCaseCompanyService } from '../services/UseCaseCompany.service';
import { CreateCompanyDto } from '../dto/CreateCompanyDto';
import { CompanyGuard } from '../guard/company.guard';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { UpdateCompanyDto } from '../dto/UpdateCompanyDto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCompanyMessages } from '../messages/CompanyMessages';
@ApiTags('Company')
@Controller('company')
export class UseCaseCompanyController {
  constructor(private readonly useCaseCompanyService: UseCaseCompanyService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Criar empresa',
    description: 'Cria uma nova empresa no sistema',
  })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({
    status: 201,
    description: 'Empresa criada com sucesso',
    schema: {
      example: {
        name: 'Empresa Exemplo LTDA',
        email: 'contato@empresa.com',
        cnpj: '12.345.678/0001-90',
        phone: '(11) 99999-9999',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: CreateCompanyMessages.COMPANY_PASSWORD_NOT_MATCH,
  })
  @ApiResponse({
    status: 409,
    description: CreateCompanyMessages.COMPANY_ALREADY_EXISTS,
  })
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.useCaseCompanyService.createCompany(createCompanyDto);
  }

  @UseGuards(CompanyGuard)
  @Patch('/update')
  @ApiOperation({
    summary: 'Atualizar empresa',
    description: 'Atualiza dados da empresa',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({ status: 200, description: 'Empresa atualizada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({
    status: 404,
    description: CreateCompanyMessages.COMPANY_NOT_FOUND,
  })
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
