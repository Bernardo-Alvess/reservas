import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UseCaseUserController } from './controllers/UseCaseUser.controller';
import { UserCaseUserService } from './services/UseCaseUser.service';
import { UseCaseUserRepository } from './repositories/UseCaseUserRepository';
import { ReadUserController } from './controllers/ReadUser.controller';
import { ReadUserService } from './services/ReadUser.service';
import { ReadUserRepository } from './repositories/ReadUserRepository';
import { AuthUserController } from './controllers/AuthUser.controller';
import { AuthUserService } from './services/AuthUser.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TokenUserJwtService } from './guard/UserJwt.service';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { CompanyModule } from '../company/company.module';
import { MailerModule } from '../mailer/mailer.module';
import { PasswordResetController } from './controllers/PasswordReset.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: 'users',
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    RestaurantModule,
    CompanyModule,
    MailerModule,
  ],
  controllers: [
    UseCaseUserController,
    ReadUserController,
    AuthUserController,
    PasswordResetController,
  ],
  providers: [
    UserCaseUserService,
    UseCaseUserRepository,
    ReadUserService,
    ReadUserRepository,
    AuthUserService,
    TokenUserJwtService,
  ],
  exports: [
    TokenUserJwtService,
    UserCaseUserService,
    ReadUserService,
    UseCaseUserRepository,
    ReadUserRepository,
  ],
})
export class UserModule {}
