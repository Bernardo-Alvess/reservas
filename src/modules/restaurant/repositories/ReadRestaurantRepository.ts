import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from '../restaurant.schema';
import { Model, Types } from 'mongoose';
import { Table } from 'src/modules/tables/table.schema';

@Injectable()
export class ReadRestaurantRepository {
  @InjectModel(Restaurant.name)
  private readonly restaurantModel: Model<Restaurant>;
  @InjectModel(Table.name)
  private readonly tableModel: Model<Table>;

  async findRestaurantById(restaurantId: string) {
    const restaurant = await this.restaurantModel.findById(restaurantId).lean();
    const tables = await this.tableModel.find({
      restaurantId: new Types.ObjectId(restaurantId),
    });

    return {
      ...restaurant,
      tables,
    };
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
