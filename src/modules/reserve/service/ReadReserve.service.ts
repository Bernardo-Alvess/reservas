import { Injectable } from '@nestjs/common';
import { ReadReserveRepository } from '../repository/ReadReserveRepository';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { ReserveStatus } from '../reserve.schema';

@Injectable()
export class ReadReserveService {
  constructor(private readonly readReserveRepository: ReadReserveRepository) {}

  async getNowReserves(clientId: string, restaurantId: string) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 15);
    return await this.readReserveRepository.getNowReserves(
      clientId,
      date,
      restaurantId,
    );
  }

  async findByClientId(
    clientId: string,
    pageOptionsDto: PageOptionsDto,
    status?: ReserveStatus,
  ) {
    return await this.readReserveRepository.findByClientId(
      clientId,
      pageOptionsDto,
      status,
    );
  }

  async findReserveById(reserveId: string) {
    return await this.readReserveRepository.findReserveById(reserveId);
  }

  async listReserves() {
    return await this.readReserveRepository.listReserves();
  }

  async listReservesByRestaurantId(
    restaurantId: string,
    pageOptionsDto: PageOptionsDto,
    status?: ReserveStatus,
    today?: boolean,
  ) {
    return await this.readReserveRepository.listReservesByRestaurantId(
      restaurantId,
      pageOptionsDto,
      status,
      today,
    );
  }

  async getStatsByRestaurantId(
    restaurantId: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    if (!startDate || !endDate) {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
    }

    return await this.readReserveRepository.getStatsByRestaurantId(
      restaurantId,
      startDate,
      endDate,
    );
  }

  async getUpcomingReservations(restaurantId: string, limit: number = 10) {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
    );

    return await this.readReserveRepository.getUpcomingReservations(
      restaurantId,
      now,
      endOfDay,
      limit,
    );
  }
}
