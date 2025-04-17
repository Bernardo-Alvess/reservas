import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserve, ReserveSchema } from './reserve.schema';
import { ReadReserveController } from './controller/ReadReserve.controller';
import { UseCaseReserveController } from './controller/UseCaseReserve.controller';
import { ReadReserveRepository } from './repository/ReadReserveRepository';
import { ReadReserveService } from './service/ReadReserve.service';
import { UseCaseReserveRepository } from './repository/UseCaseReserveRepository';
import { UseCaseReserveService } from './service/UseCaseReserve.service';
import { UserModule } from '../user/user.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { TableModule } from '../tables/table.module';
import { ReadTableService } from '../tables/services/ReadTable.service';

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
    forwardRef(() => TableModule),
  ],
  controllers: [ReadReserveController, UseCaseReserveController],
  providers: [
    ReadReserveRepository,
    ReadReserveService,
    UseCaseReserveRepository,
    UseCaseReserveService,
    ReadTableService,
  ],
  exports: [ReserveModule, MongooseModule],
})
export class ReserveModule {}
