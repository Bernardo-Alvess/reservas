import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table } from '../table.schema';
import { Reserve } from '../../reserve/reserve.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReadTableRepository {
  constructor(
    @InjectModel(Table.name) private readonly tableModel: Model<Table>,
    @InjectModel(Reserve.name) private readonly reserveModel: Model<Reserve>,
  ) {}

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

  async getTableStats(restaurantId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalTables, blockedTables, tablesWithReservations] =
      await Promise.all([
        this.tableModel.countDocuments({
          restaurantId: new Types.ObjectId(restaurantId),
        }),
        this.tableModel.countDocuments({
          restaurantId: new Types.ObjectId(restaurantId),
          isReserved: true,
        }),
        this.reserveModel.distinct('tableId', {
          restaurantId: new Types.ObjectId(restaurantId),
          startTime: { $gte: today },
          status: { $in: ['Pendente', 'Confirmada'] },
          tableId: { $ne: null },
        }),
      ]);

    return {
      totalTables,
      blockedTables,
      tablesWithReservations: tablesWithReservations.length,
      availableTables: totalTables - tablesWithReservations.length,
    };
  }
}
