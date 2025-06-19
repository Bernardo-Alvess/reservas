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
import { CPFVerificationService } from './service/CPFVerification.service';
import { MailerModule } from '../mailer/mailer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReserveReminderService } from './service/ReserveReminder.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Reserve.name,
        schema: ReserveSchema,
        collection: 'reserves',
      },
    ]),
    UserModule,
    forwardRef(() => RestaurantModule),
    forwardRef(() => TableModule),
    MailerModule,
  ],
  controllers: [ReadReserveController, UseCaseReserveController],
  providers: [
    ReadReserveRepository,
    ReadReserveService,
    UseCaseReserveRepository,
    UseCaseReserveService,
    ReadTableService,
    CPFVerificationService,
    ReserveReminderService,
  ],
  exports: [
    ReadReserveRepository,
    ReadReserveService,
    UseCaseReserveRepository,
    UseCaseReserveService,
    MongooseModule,
  ],
})
export class ReserveModule {}
