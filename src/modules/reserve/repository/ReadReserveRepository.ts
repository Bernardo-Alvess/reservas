import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Reserve, ReserveDocument } from '../reserve.schema';
import { InjectModel } from '@nestjs/mongoose';
import { types } from 'util';

@Injectable()
export class ReadReserveRepository {
  constructor(
    @InjectModel(Reserve.name)
    private readonly reserveModel: Model<ReserveDocument>,
  ) {}

  async findByRestaurantId(restaurantId: string) {
    return await this.reserveModel.find({ restaurantId });
  }

  async findByClientId(clientId: string) {
    return await this.reserveModel.find({ clientId });
  }

  async findReserveById(reserveId: string) {
    return await this.reserveModel.findById({ _id: reserveId });
  }

  async listReserves() {
    return await this.reserveModel.find();
  }

  async findConflictingReservations(assignTableDto: { tableId: string; startTime: Date; endTime: Date }) {
    console.log(new Date(assignTableDto.endTime));
    console.log('endTime é Date?',   assignTableDto.endTime   instanceof Date);

    const conflicts = await this.reserveModel.find({
      tableId: new Types.ObjectId(assignTableDto.tableId),
      startTime: {$lt: new Date(assignTableDto.endTime)},
      endTime: {$gt: new Date(assignTableDto.startTime)},
    });

    console.log(new Date(assignTableDto.endTime))
    console.log(conflicts)
    if(conflicts.length > 0) return true

    console.log('conflictingReservations', conflicts);
    return false;
  }
}
