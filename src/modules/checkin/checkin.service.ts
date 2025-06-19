import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reserve } from '../reserve/reserve.schema';

@Injectable()
export class CheckinService {
  constructor(
    @InjectModel('Reserve')
    private readonly reserveModel: Model<Reserve>,
  ) {}

  async checkin(restaurantId: string, email: string) {
    const now = new Date();
    const reserva = await this.reserveModel.findOne({
      restaurantId: new Types.ObjectId(restaurantId),
      email,
      startTime: { $lte: now },
      endTime: { $gte: now },
      status: 'Confirmada',
    });

    if (!reserva)
      throw new BadRequestException(
        'Reserva não encontrada ou fora do horário permitido',
      );

    if (!reserva) return null;

    reserva.checkedInAt = now;
    reserva.checkedIn = true;

    await reserva.save();

    return { message: 'Check-in realizado com sucesso', reserva };
  }
}
