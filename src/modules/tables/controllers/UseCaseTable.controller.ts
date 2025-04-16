import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UseCaseTableService } from '../services/UseCaseTable.service';
import { CreateTableDto } from '../dto/CreateTableDto';
import { UpdateTableDto } from '../dto/UpdateTableDto';

@Controller('table')
export class UseCaseTableController {
  constructor(private readonly useCaseTableService: UseCaseTableService) {}

  @Post()
  async createTable(@Body() CreateTableDto: CreateTableDto) {
    return await this.useCaseTableService.createTable(CreateTableDto);
  }

  @Patch()
  async updateTable(@Body() UpdateTableDto: UpdateTableDto) {
    return await this.useCaseTableService.updateTable(UpdateTableDto);
  }
}
