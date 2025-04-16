import { Module } from '@nestjs/common';
import { UseCaseTableController } from './controllers/UseCaseTable.controller';
import { ReadTableRepository } from './repositories/ReadTable.repository';
import { UseCaseTableRepository } from './repositories/UseCaseTable.repository';
import { ReadTableService } from './services/ReadTable.service';
import { UseCaseTableService } from './services/UseCaseTable.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './table.schema';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { ReserveModule } from '../reserve/reserve.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
    RestaurantModule,
    ReserveModule,
  ],
  controllers: [UseCaseTableController],
  providers: [
    ReadTableRepository,
    UseCaseTableRepository,
    ReadTableService,
    UseCaseTableService,
  ],
})
export class TableModule {}
