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
  ],
  controllers: [UseCaseUserController, ReadUserController, AuthUserController],
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
