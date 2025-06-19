import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurant.schema';
import { forwardRef, Module } from '@nestjs/common';
import { UseCaseRestaurantRepository } from './repositories/UseCaseRestaurantRepository';
import { UseCaseRestaurantController } from './controllers/UseCaseRestaurant.controller';
import { UseCaseRestaurantService } from './services/UseCaseRestaurant.service';
import { CompanyModule } from '../company/company.module';
import { ReadRestaurantRepository } from './repositories/ReadRestaurantRepository';
import { ReadRestaurantController } from './controllers/ReadRestaurant.controller';
import { ReadRestaurantService } from './services/ReadRestaurant.service';
import { Table, TableSchema } from '../tables/table.schema';
import { CloudinaryService } from './services/Cloudinary.service';
import { UserModule } from '../user/user.module';
import { RestaurantUploadFilesController } from './controllers/RestaurantUploadFiles.controller';
import { QrCodeService } from './services/QrCode.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Table.name, schema: TableSchema },
    ]),
    CompanyModule,
    forwardRef(() => UserModule),
  ],
  controllers: [
    UseCaseRestaurantController,
    ReadRestaurantController,
    RestaurantUploadFilesController,
  ],
  providers: [
    UseCaseRestaurantService,
    UseCaseRestaurantRepository,
    ReadRestaurantRepository,
    ReadRestaurantService,
    CloudinaryService,
    QrCodeService,
  ],
  exports: [ReadRestaurantService, MongooseModule, ReadRestaurantRepository],
})
export class RestaurantModule {}
