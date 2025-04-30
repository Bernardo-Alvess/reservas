import { Controller, Get } from '@nestjs/common';
import { ReadCompanyService } from '../services/ReadCompany.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class ReadCompanyController {
  constructor(private readonly readCompanyService: ReadCompanyService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas as empresas',
    description: 'Retorna todas as empresas cadastradas no sistema',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas retornada com sucesso',
    schema: {
      example: [
        {
          name: 'Empresa Exemplo LTDA',
          email: 'contato@empresa.com',
          cnpj: '12.345.678/0001-90',
          phone: '(11) 99999-9999',
        },
      ],
    },
  })
  async listCompanies() {
    return this.readCompanyService.listCompanies();
  }
}
