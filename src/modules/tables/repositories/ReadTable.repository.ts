import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from '../table.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReadTableRepository {
  @InjectModel(Table.name) private readonly tableModel: Model<Table>;

  async findTableById(_id: string) {
    const table = await this.tableModel.findById({
      _id: new Types.ObjectId(_id),
    });
    if (!table) throw new NotFoundException('Mesa não encontrada');
    return table;
  }

  async findAllTables(restaurantId: string, isReserved?: boolean) {
    const query: any = { restaurantId: new Types.ObjectId(restaurantId) };
    if (isReserved !== undefined) {
      query.isReserved = isReserved;
    }
    return await this.tableModel.find(query);
  }
}
