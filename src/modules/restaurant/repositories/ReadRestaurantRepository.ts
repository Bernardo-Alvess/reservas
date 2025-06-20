import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from '../restaurant.schema';
import { Model, Types } from 'mongoose';
import { Table } from 'src/modules/tables/table.schema';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { PageDto, PageMetaDto } from 'src/common/dto/PageDto';

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

  async listRestaurants(pageOptionsDto: PageOptionsDto, type: string) {
    const { page, limit, search } = pageOptionsDto;

    const filters: any = {};

    if (search) {
      const regex = { $regex: search, $options: 'i' };

      filters.$or = [
        { name: regex },
        { 'address.city': regex },
        { 'address.state': regex },
        { 'address.street': regex },
        { 'address.district': regex },
        { 'address.zipCode': regex },
      ];
    }

    if (type) {
      filters.type = type;
    }

    const dataPromise = this.restaurantModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit);

    const [data, count] = await Promise.all([
      dataPromise,
      this.restaurantModel.countDocuments(filters),
    ]);

    pageOptionsDto.page = page;
    pageOptionsDto.limit = limit;

    const pageMetaDto = new PageMetaDto({
      totalItems: count,
      pageOptionsDto,
    });

    return new PageDto(data, pageMetaDto);
  }

  async listRestaurantsByCompanyId(companyId: string) {
    const restaurants = await this.restaurantModel.find({
      companyId: new Types.ObjectId(companyId),
    });
    return restaurants;
  }
}
