import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from '../table.schema';
import { Model } from 'mongoose';
import { CreateTableDto } from '../dto/CreateTableDto';
import { UpdateTableDto } from '../dto/UpdateTableDto';

@Injectable()
export class UseCaseTableRepository {
  @InjectModel(Table.name) private readonly tableModel: Model<Table>;

  async createTable(createTableDto: CreateTableDto) {
    const table = await this.tableModel.create(createTableDto);
    return table;
  }

  async updateTable(updateTableDto: UpdateTableDto) {
    const table = await this.tableModel.findByIdAndUpdate(
      { _id: updateTableDto._id },
      updateTableDto,
      { new: true },
    );
    return table;
  }
}
