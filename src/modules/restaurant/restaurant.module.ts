import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurant.schema';
import { Module } from '@nestjs/common';
import { UseCaseRestaurantRepository } from './repositories/UseCaseRestaurantRepository';
import { UseCaseRestaurantController } from './controllers/UseCaseRestaurant.controller';
import { UseCaseRestaurantService } from './services/UseCaseRestaurant.service';
import { CompanyModule } from '../company/company.module';
import { ReadRestaurantRepository } from './repositories/ReadRestaurantRepository';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
    CompanyModule,
  ],
  controllers: [UseCaseRestaurantController],
  providers: [
    UseCaseRestaurantService,
    UseCaseRestaurantRepository,
    ReadRestaurantRepository,
  ],
})
export class RestaurantModule {}
