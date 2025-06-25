import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReadRestaurantRepository } from '../repositories/ReadRestaurantRepository';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { Reserve } from '../../reserve/reserve.schema';
import { Table } from '../../tables/table.schema';

@Injectable()
export class ReadRestaurantService {
  constructor(
    private readonly readRestaurantRepository: ReadRestaurantRepository,
    @InjectModel(Reserve.name) private reserveModel: Model<Reserve>,
    @InjectModel(Table.name) private tableModel: Model<Table>,
  ) {}

  async listAll(pageOptionsDto: PageOptionsDto, type: string) {
    const restaurants = await this.readRestaurantRepository.listRestaurants(
      pageOptionsDto,
      type,
    );
    return restaurants;
  }

  async findRestaurantById(restaurantId: string) {
    return await this.readRestaurantRepository.findRestaurantById(restaurantId);
  }

  async getRestaurantDashboard(restaurantId: string) {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    );

    const [todayReservations, restaurant] = await Promise.all([
      this.reserveModel
        .find({
          restaurantId: new Types.ObjectId(restaurantId),
          startTime: { $gte: startOfDay, $lte: endOfDay },
        })
        .exec(),
      this.readRestaurantRepository.findRestaurantById(restaurantId),
    ]);

    const totalReservations = todayReservations.length;
    const totalPeople = todayReservations.reduce(
      (sum, r) => sum + r.amountOfPeople,
      0,
    );

    const confirmedPeople = todayReservations
      .filter((r) => r.status === 'Confirmada')
      .reduce((sum, r) => sum + r.amountOfPeople, 0);

    const activePeople = todayReservations
      .filter((r) => r.status === 'Pendente' || r.status === 'Confirmada')
      .reduce((sum, r) => sum + r.amountOfPeople, 0);

    const maxCapacity = restaurant?.maxClients || 0;

    const totalOccupancyRate =
      maxCapacity > 0
        ? Math.round((activePeople / maxCapacity) * 10000) / 100
        : 0;
    const confirmedOccupancyRate =
      maxCapacity > 0
        ? Math.round((confirmedPeople / maxCapacity) * 10000) / 100
        : 0;

    return {
      totalOccupancyRate,
      confirmedOccupancyRate,
      totalReservations,
      totalPeople,
    };
  }

  async listCookTypes() {
    return await this.readRestaurantRepository.listCookTypes();
  }
}
