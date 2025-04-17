import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserve, ReserveSchema } from './reserve.schema';
import { ReadReserveController } from './controller/ReadReserve.controller';
import { UseCaseReserveController } from './controller/UseCaseReserve.controller';
import { ReadReserveRepository } from './repository/ReadReserveRepository';
import { ReadReserveService } from './service/ReadReserve.service';
import { UseCaseReserveRepository } from './repository/UseCaseReserveRepository';
import { UseCaseReserveService } from './service/UseCaseReserve.sevice';
import { UserModule } from '../user/user.module';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Reserve.name,
        schema: ReserveSchema,
        collection: 'reserves',
      },
    ]),
    UserModule,
    RestaurantModule,
  ],
  controllers: [ReadReserveController, UseCaseReserveController],
  providers: [
    ReadReserveRepository,
    ReadReserveService,
    UseCaseReserveRepository,
    UseCaseReserveService,
  ],
  exports: [ReserveModule, MongooseModule]
})
export class ReserveModule {}
