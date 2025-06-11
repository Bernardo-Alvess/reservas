import { Injectable } from '@nestjs/common';
import { ReadReserveRepository } from '../repository/ReadReserveRepository';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';

@Injectable()
export class ReadReserveService {
  constructor(private readonly readReserveRepository: ReadReserveRepository) {}
  // async findByRestaurantId(restaurantId: string) {
  //   return await this.readReserveRepository.findByRestaurantId(restaurantId);
  // }

  async findByClientId(clientId: string) {
    return await this.readReserveRepository.findByClientId(clientId);
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
  ) {
    return await this.readReserveRepository.listReservesByRestaurantId(
      restaurantId,
      pageOptionsDto,
    );
  }
}
