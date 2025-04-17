import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurant.schema';
import { Module } from '@nestjs/common';
import { UseCaseRestaurantRepository } from './repositories/UseCaseRestaurantRepository';
import { UseCaseRestaurantController } from './controllers/UseCaseRestaurant.controller';
import { UseCaseRestaurantService } from './services/UseCaseRestaurant.service';
import { CompanyModule } from '../company/company.module';
import { ReadRestaurantRepository } from './repositories/ReadRestaurantRepository';
import { ReadRestaurantController } from './controllers/ReadRestaurant.controller';
import { ReadRestaurantService } from './services/ReadRestaurant.service';
import { Reserve } from '../reserve/reserve.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
    CompanyModule,
  ],
  controllers: [UseCaseRestaurantController, ReadRestaurantController],
  providers: [
    UseCaseRestaurantService,
    UseCaseRestaurantRepository,
    ReadRestaurantRepository,
    ReadRestaurantService,
  ],
  exports: [ReadRestaurantService, MongooseModule],
})
export class RestaurantModule {}
