import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './company.schema';
import { forwardRef, Module } from '@nestjs/common';
import { UseCaseCompanyController } from './controllers/UseCaseCompany.controller';
import { UseCaseCompanyRepository } from './repositories/UseCaseCompanyRepository';
import { UseCaseCompanyService } from './services/UseCaseCompany.service';
import { AuthCompanyController } from './controllers/AuthCompany.controller';
import { AuthCompanyService } from './services/AuthCompany.service';
import { ReadCompanyRepository } from './repositories/ReadCompanyRepository';
import { JwtModule } from '@nestjs/jwt';
import { TokenCompanyJwtService } from './guard/CompanyJwt.service';
import { ReadCompanyService } from './services/ReadCompany.service';
import { ReadCompanyController } from './controllers/ReadCompany.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema,
        collection: 'companies',
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_COMPANY_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [
    UseCaseCompanyController,
    AuthCompanyController,
    ReadCompanyController,
  ],
  providers: [
    UseCaseCompanyService,
    UseCaseCompanyRepository,
    AuthCompanyService,
    ReadCompanyRepository,
    TokenCompanyJwtService,
    ReadCompanyService,
  ],
  exports: [TokenCompanyJwtService, ReadCompanyRepository],
})
export class CompanyModule {}
