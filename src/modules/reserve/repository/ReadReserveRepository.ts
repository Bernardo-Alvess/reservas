import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Reserve, ReserveDocument } from '../reserve.schema';
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

  async findByRestaurantId(restaurantId: string) {
    return await this.reserveModel.find({
      restaurantId: new Types.ObjectId(restaurantId),
    });
  }

  async findByClientId(clientId: string) {
    return await this.reserveModel
      .find({
        clientId: new Types.ObjectId(clientId),
      })
      .populate('restaurantId')
      .populate('clientId')
      .populate('tableId');
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
  ) {
    const { orderDirection = Order.DESC } = pageOptionsDto;

    const limit = pageOptionsDto.limit || 10;
    const page = pageOptionsDto.page || 1;

    const data = await this.reserveModel
      .find({
        restaurantId: new Types.ObjectId(restaurantId),
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ startTime: orderDirection === Order.ASC ? 1 : -1 });

    const total = await this.reserveModel.countDocuments({
      restaurantId: new Types.ObjectId(restaurantId),
    });

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
    });

    if (conflicts.length > 0) return true;

    return false;
  }
}
