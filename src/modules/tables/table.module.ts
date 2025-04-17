import { forwardRef, Module } from '@nestjs/common';
import { UseCaseTableController } from './controllers/UseCaseTable.controller';
import { ReadTableRepository } from './repositories/ReadTable.repository';
import { UseCaseTableRepository } from './repositories/UseCaseTable.repository';
import { ReadTableService } from './services/ReadTable.service';
import { UseCaseTableService } from './services/UseCaseTable.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './table.schema';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { ReserveModule } from '../reserve/reserve.module';
import { ReadRestaurantRepository } from '../restaurant/repositories/ReadRestaurantRepository';
import { ReadReserveRepository } from '../reserve/repository/ReadReserveRepository';
import { Reserve } from '../reserve/reserve.schema';
import { ReadTableController } from './controllers/ReadTable.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
    RestaurantModule,
    forwardRef(() => ReserveModule)
  ],
  controllers: [UseCaseTableController, ReadTableController],
  providers: [
    ReadTableRepository,
    UseCaseTableRepository,
    ReadTableService,
    UseCaseTableService,
    ReadRestaurantRepository,
    ReadReserveRepository
  ],
  exports: [TableModule, ReadTableService, ReadTableRepository]
})
export class TableModule {}
