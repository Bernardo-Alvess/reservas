import { MongooseModule } from "@nestjs/mongoose";
import { Company, CompanySchema } from "./company.schema";
import { Module } from "@nestjs/common";
import { UseCaseCompanyController } from "./controllers/UseCaseCompany.controller";
import { UseCaseCompanyRepository } from "./repositories/UseCaseCompanyRepository";
import { UseCaseCompanyService } from "./services/UseCaseCompany.service";
import { AuthCompanyController } from "./controllers/AuthCompany.controller";
import { AuthCompanyService } from "./services/AuthCompany.service";
import { ReadCompanyRepository } from "./repositories/ReadCompanyRepository";
import { JwtModule } from "@nestjs/jwt";
import { TokenCompanyJwtService } from "./guard/CompanyJwt.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema,
        collection: "companies",
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_COMPANY_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [UseCaseCompanyController, AuthCompanyController],
  providers: [
    UseCaseCompanyService,
    UseCaseCompanyRepository,
    AuthCompanyService,
    ReadCompanyRepository,
    TokenCompanyJwtService,
  ],
  exports: [TokenCompanyJwtService, ReadCompanyRepository],
})
export class CompanyModule {}
