import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from '../table.schema';
import { Model, Types } from 'mongoose';
import { CreateTableDto } from '../dto/CreateTableDto';
import { UpdateTableDto } from '../dto/UpdateTableDto';

@Injectable()
export class UseCaseTableRepository {
  @InjectModel(Table.name) private readonly tableModel: Model<Table>;

  async createTable(createTableDto: CreateTableDto) {
    const table = await this.tableModel.create({
      ...createTableDto,
      restaurantId: new Types.ObjectId(createTableDto.restaurantId),
    });
    return table;
  }

  async updateTable(updateTableDto: UpdateTableDto, id: string) {
    const table = await this.tableModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(id) },
      { ...updateTableDto, isReserved: updateTableDto.isReserved },
      { new: true },
    );
    return table;
  }
}
