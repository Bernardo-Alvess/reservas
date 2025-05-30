import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Reserve, ReserveDocument } from '../reserve.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AssignTableDto } from '../dto/AssignTableDto';

@Injectable()
export class ReadReserveRepository {
  constructor(
    @InjectModel(Reserve.name)
    private readonly reserveModel: Model<ReserveDocument>,
  ) {}

  async findByRestaurantId(restaurantId: string) {
    return await this.reserveModel.find({
      restaurantId: new Types.ObjectId(restaurantId),
    });
  }

  async findByClientId(clientId: string) {
    return await this.reserveModel.find({
      clientId: new Types.ObjectId(clientId),
    }).populate('restaurantId').populate('clientId').populate('tableId');
  }

  async findReserveById(reserveId: string) {
    return await this.reserveModel.findById({
      _id: new Types.ObjectId(reserveId),
    });
  }

  async listReserves() {
    return await this.reserveModel.find();
  }

  async listReservesByRestaurantId(restaurantId: string) {
    return await this.reserveModel.find({
      restaurantId: new Types.ObjectId(restaurantId),
    });
  }

  // retorna TRUE caso haja conflito de reservas
  // retorna FALSE caso não haja conflito de reservas
  async findConflictingReservations(
    assignTableDto: AssignTableDto,
    startTime: Date,
    endTime: Date,
  ) {
    const conflicts = await this.reserveModel.find({
      tableId: new Types.ObjectId(assignTableDto.tableId),
      startTime: { $lt: new Date(endTime) },
      endTime: { $gt: new Date(startTime) },
    });

    if (conflicts.length > 0) return true;

    return false;
  }
}
