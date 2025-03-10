import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Reserve, ReserveDocument } from '../reserve.schema';
import { InjectModel } from '@nestjs/mongoose';

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
}
