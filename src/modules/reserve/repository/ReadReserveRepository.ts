import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Reserve, ReserveDocument, ReserveStatus } from '../reserve.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AssignTableDto } from '../dto/AssignTableDto';
import { Order, PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { PageDto, PageMetaDto } from 'src/common/dto/PageDto';

@Injectable()
export class ReadReserveRepository {
  constructor(
    @InjectModel(Reserve.name)
    private readonly reserveModel: Model<ReserveDocument>,
  ) {}

  async getNowReserves(clientId: string, date: Date, restaurantId: string) {
    console.log({ clientId, date, restaurantId });
    return await this.reserveModel.find({
      clientId: new Types.ObjectId(clientId),
      startTime: { $lte: date },
      endTime: { $gte: date },
      status: { $in: ['Pendente', 'Confirmada'] },
      restaurantId: new Types.ObjectId(restaurantId),
    });
  }

  async findByRestaurantId(restaurantId: string) {
    return await this.reserveModel.find({
      restaurantId: new Types.ObjectId(restaurantId),
    });
  }

  async findByClientId(
    clientId: string,
    pageOptionsDto: PageOptionsDto,
    status?: ReserveStatus,
  ) {
    const filters: any = {
      clientId: new Types.ObjectId(clientId),
    };

    if (status) {
      filters.status = status;
    }

    const limit = pageOptionsDto.limit || 10;
    const page = pageOptionsDto.page || 1;

    const dataPromise = this.reserveModel
      .find(filters)
      .populate('restaurantId')
      .populate('clientId')
      .populate('tableId')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const data = await dataPromise;

    const total = await this.reserveModel.countDocuments(filters);

    pageOptionsDto.page = page;
    pageOptionsDto.limit = limit;

    const pageMetaDto = new PageMetaDto({
      totalItems: total,
      pageOptionsDto,
    });

    return new PageDto(data, pageMetaDto);
  }

  async findReserveById(reserveId: string) {
    return await this.reserveModel.findById({
      _id: new Types.ObjectId(reserveId),
    });
  }

  async listReserves() {
    return await this.reserveModel.find();
  }

  async listReservesByRestaurantId(
    restaurantId: string,
    pageOptionsDto: PageOptionsDto,
    status?: ReserveStatus,
    today?: boolean,
    startDate?: string,
  ) {
    const { orderDirection = Order.ASC, search } = pageOptionsDto;

    const filters: any = {
      restaurantId: new Types.ObjectId(restaurantId),
    };

    if (today) {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      filters.startTime = { $gte: startOfDay, $lt: endOfDay };
    }

    if (status) {
      filters.status = status;
    }

    if (search) {
      const searchConditions: any[] = [
        { name: { $regex: search, $options: 'i' } },
      ];

      // Se a busca for um número, também busca por tableNumber
      if (!isNaN(Number(search))) {
        searchConditions.push({ tableNumber: Number(search) });
      }

      filters.$or = searchConditions;
    }
    if (startDate) {
      filters.startTime = { $gte: new Date(startDate) };
    }

    const limit = pageOptionsDto.limit || 10;
    const page = pageOptionsDto.page || 1;

    const dataPromise = this.reserveModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ startTime: orderDirection === Order.ASC ? 1 : -1 })
      .populate('clientId')
      .populate('tableId');

    const data = await dataPromise;

    const total = await this.reserveModel.countDocuments(filters);

    pageOptionsDto.page = page;
    pageOptionsDto.limit = limit;

    const pageMetaDto = new PageMetaDto({
      totalItems: total,
      pageOptionsDto,
    });

    return new PageDto(data, pageMetaDto);
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
      status: { $ne: 'Cancelada' },
    });

    if (conflicts.length > 0) return true;

    return false;
  }

  async getStatsByRestaurantId(restaurantId: string, startDate: Date) {
    try {
      const stats = await this.reserveModel.aggregate([
        {
          $match: {
            restaurantId: new Types.ObjectId(restaurantId),
            startTime: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            canceled: {
              $sum: {
                $cond: [{ $eq: ['$status', 'Cancelada'] }, 1, 0],
              },
            },
            pending: {
              $sum: {
                $cond: [{ $eq: ['$status', 'Pendente'] }, 1, 0],
              },
            },
            confirmed: {
              $sum: {
                $cond: [{ $eq: ['$status', 'Confirmada'] }, 1, 0],
              },
            },
            totalPeople: { $sum: '$amountOfPeople' },
          },
        },
        {
          $project: {
            _id: 0,
            total: 1,
            canceled: 1,
            pending: 1,
            confirmed: 1,
            totalPeople: 1,
          },
        },
      ]);

      return { stats: stats[0] };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(
        'Erro ao buscar estatísticas do restaurante',
      );
    }
  }

  async getUpcomingReservations(
    restaurantId: string,
    startTime: Date,
    endTime: Date,
    limit: number,
  ) {
    return await this.reserveModel
      .find({
        restaurantId: new Types.ObjectId(restaurantId),
        startTime: { $gte: startTime, $lte: endTime },
        status: { $in: ['Pendente', 'Confirmada'] },
      })
      .sort({ startTime: 1 })
      .limit(limit)
      .populate('tableId', 'tableNumber numberOfSeats')
      .select(
        'startTime endTime amountOfPeople name email status clientConfirmed restaurantConfirmed tableId',
      )
      .exec();
  }
}
