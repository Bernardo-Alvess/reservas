import { BadRequestException, Injectable } from '@nestjs/common';
import {
  GalleryDto,
  MenuDto,
  ProfileImageDto,
  Restaurant,
} from '../restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRestaurantDto } from '../dto/CreateRestaurantDto';

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

  async updateProfileImage(
    restaurantId: string,
    profileImage: ProfileImageDto,
  ) {
    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      new Types.ObjectId(restaurantId),
      {
        profileImage,
      },
      {
        new: true,
      },
    );

    return restaurant;
  }

  async updateMenu(restaurantId: string, menu: MenuDto) {
    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      new Types.ObjectId(restaurantId),
      {
        menu,
      },
      {
        new: true,
      },
    );

    return restaurant;
  }

  async updateGallery(restaurantId: string, gallery: GalleryDto[]) {
    const restaurante = await this.restaurantModel.findById(restaurantId);

    if (restaurante.gallery.length >= 10) {
      throw new BadRequestException('Número máximo de imagens atingido');
      return;
    }

    const updateRestaurant = await this.restaurantModel.findByIdAndUpdate(
      new Types.ObjectId(restaurantId),
      {
        $push: {
          gallery: {
            $each: gallery,
          },
        },
      },
      {
        new: true,
      },
    );

    return updateRestaurant;
  }

  async deleteGalleryImage(restaurantId: string, publicId: string) {
    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      new Types.ObjectId(restaurantId),
      {
        $pull: {
          gallery: {
            publicId,
          },
        },
      },
      {
        new: true,
      },
    );

    return restaurant;
  }

  async setQrCode(restaurantId: string, qrCode: string) {
    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      new Types.ObjectId(restaurantId),
      { qrCode },
      {
        new: true,
      },
    );

    return restaurant;
  }
}
