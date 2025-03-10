import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reserve } from '../reserve.schema';
import { Model } from 'mongoose';
import { CreateReserveDto } from '../dto/CreateReserveDto';

@Injectable()
export class UseCaseReserveRepository {
  @InjectModel(Reserve.name) private readonly reserveModel: Model<Reserve>;

  async createReserve(reserve: CreateReserveDto, clientId: string) {
    return await this.reserveModel.create({
      ...reserve,
      clientId,
    });
  }
}
