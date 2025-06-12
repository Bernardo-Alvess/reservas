import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reserve } from '../reserve.schema';
import { Model, Types } from 'mongoose';
import { CreateReserveDto } from '../dto/CreateReserveDto';
import { ReadReserveRepository } from './ReadReserveRepository';

@Injectable()
export class UseCaseReserveRepository {
  @InjectModel(Reserve.name) private readonly reserveModel: Model<Reserve>;

  constructor(private readonly readReserveRepository: ReadReserveRepository) {}

  async createReserve(reserve: CreateReserveDto, clientId: string) {
    return await this.reserveModel.create({
      ...reserve,
      clientId: new Types.ObjectId(clientId),
      restaurantId: new Types.ObjectId(reserve.restaurantId),
    });
  }

  async assignTableToReserve(
    tableId: string,
    reserveId: string,
    tableNumber: number,
  ) {
    return await this.reserveModel.findByIdAndUpdate(
      { _id: reserveId },
      {
        tableId: new Types.ObjectId(tableId),
        tableNumber,
      },
      { new: true },
    );
  }

  async confirmReserve(id: string, type: 'client' | 'restaurant') {
    switch (type) {
      case 'client':
        return await this.reserveModel.findByIdAndUpdate(
          { _id: id },
          { $set: { clientConfirmed: true, status: 'Confirmada' } },
          { new: true },
        );
      case 'restaurant':
        const reserve = await this.reserveModel.findById(id);
        if (reserve.canceledBy === 'user') {
          return {
            status: 'error',
            message:
              'Não é possível confirmar uma reserva que foi cancelada pelo cliente	',
          };
        }

        return await this.reserveModel.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              restaurantConfirmed: true,
              clientConfirmed: false,
              status: 'Pendente',
              canceledBy: null,
            },
          },
          { new: true },
        );
    }
  }

  async cancelReserve(id: string, type: 'client' | 'restaurant') {
    switch (type) {
      case 'client':
        return await this.reserveModel.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              clientConfirmed: false,
              status: 'Cancelada',
              canceledBy: 'user',
              canceledAt: new Date(),
            },
          },
          { new: true },
        );
      case 'restaurant':
        return await this.reserveModel.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              restaurantConfirmed: false,
              status: 'Cancelada',
              canceledBy: 'restaurant',
              canceledAt: new Date(),
            },
          },
          { new: true },
        );
    }
  }
}
