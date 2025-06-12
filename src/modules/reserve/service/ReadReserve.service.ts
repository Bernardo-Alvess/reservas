import { Injectable } from '@nestjs/common';
import { ReadReserveRepository } from '../repository/ReadReserveRepository';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { ReserveStatus } from '../reserve.schema';

@Injectable()
export class ReadReserveService {
  constructor(private readonly readReserveRepository: ReadReserveRepository) {}
  // async findByRestaurantId(restaurantId: string) {
  //   return await this.readReserveRepository.findByRestaurantId(restaurantId);
  // }

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
}
