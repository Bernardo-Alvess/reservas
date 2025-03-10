import { Injectable } from '@nestjs/common';
import { ReadRestaurantRepository } from '../repositories/ReadRestaurantRepository';

@Injectable()
export class ReadRestaurantService {
  constructor(
    private readonly readRestaurantRepository: ReadRestaurantRepository,
  ) {}

  async listAll() {
    const restaurants = await this.readRestaurantRepository.listRestaurants();
    return restaurants;
  }

  async findRestaurantById(restaurantId: string) {
    return await this.readRestaurantRepository.findRestaurantById(restaurantId);
  }
}
