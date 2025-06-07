import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from '../restaurant.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReadRestaurantRepository {
  @InjectModel(Restaurant.name)
  private readonly restaurantModel: Model<Restaurant>;

  async findRestaurantById(restaurantId: string) {
    const restaurant = await this.restaurantModel.findById(restaurantId);
    return restaurant;
  }

  async listRestaurants() {
    const restaurants = await this.restaurantModel.find();
    return restaurants;
  }

  async listRestaurantsByCompanyId(companyId: string) {
    const restaurants = await this.restaurantModel.find({
      companyId: new Types.ObjectId(companyId),
    });
    return restaurants;
  }
}
