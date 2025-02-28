import { Injectable } from "@nestjs/common";
import { Restaurant } from "../restaurant.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateRestaurantDto } from "../dto/CreateRestaurantDto";

@Injectable()
export class UseCaseRestaurantRepository {
  @InjectModel(Restaurant.name)
  private readonly restaurantModel: Model<Restaurant>;

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
    companyId: string,
  ) {
    const restaurant = await this.restaurantModel.create({
      ...createRestaurantDto,
      companyId: new Types.ObjectId(companyId),
    });

    return restaurant;
  }

  async updateRestaurant(
    restaurantId: string,
    updateRestaurantDto: CreateRestaurantDto,
  ) {
    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      restaurantId,
      updateRestaurantDto,
      {
        new: true,
      },
    );

    return restaurant;
  }
}
