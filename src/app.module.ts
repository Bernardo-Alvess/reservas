import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { ReserveModule } from './modules/reserve/reserve.module';
import { TableModule } from './modules/tables/table.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    CompanyModule,
    RestaurantModule,
    ReserveModule,
    TableModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
