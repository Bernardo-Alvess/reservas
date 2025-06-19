import { Injectable } from '@nestjs/common';
import { ReadRestaurantRepository } from '../repositories/ReadRestaurantRepository';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';

@Injectable()
export class ReadRestaurantService {
  constructor(
    private readonly readRestaurantRepository: ReadRestaurantRepository,
    // private readonly readTableService: ReadTableService,
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
}
