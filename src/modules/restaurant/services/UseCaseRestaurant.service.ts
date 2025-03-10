import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCaseRestaurantRepository } from '../repositories/UseCaseRestaurantRepository';
import { CreateRestaurantDto } from '../dto/CreateRestaurantDto';
import { TokenCompanyJwtService } from 'src/modules/company/guard/CompanyJwt.service';
import { ReadCompanyRepository } from 'src/modules/company/repositories/ReadCompanyRepository';
import { CreateCompanyMessages } from 'src/modules/company/messages/CompanyMessages';
import { ReadRestaurantRepository } from '../repositories/ReadRestaurantRepository';
import { RestaurantMessages } from '../messages/RestaurantMessages';

@Injectable()
export class UseCaseRestaurantService {
  constructor(
    private readonly useCaseRestaurantRepository: UseCaseRestaurantRepository,
    private readonly companyTokenService: TokenCompanyJwtService,
    private readonly readCompanyRepository: ReadCompanyRepository,
    private readonly readRestaurantRepository: ReadRestaurantRepository,
  ) {}

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
    sessionTokenR: string,
  ) {
    const payload =
      await this.companyTokenService.checkSessionToken(sessionTokenR);
    const companyId = payload.sub;
    const company = await this.readCompanyRepository.findCompanyById(companyId);

    if (!company)
      throw new NotFoundException(CreateCompanyMessages.COMPANY_NOT_FOUND);

    const restaurant = await this.useCaseRestaurantRepository.createRestaurant(
      createRestaurantDto,
      companyId,
    );

    return restaurant;
  }

  async updateRestaurant(
    restaurantId: string,
    updateRestaurantDto: CreateRestaurantDto,
  ) {
    const restaurant = await this.readRestaurantRepository.findRestaurantById(
      restaurantId.toString(),
    );

    if (!restaurant)
      throw new NotFoundException(RestaurantMessages.RESTAURANT_NOT_FOUND);

    return await this.useCaseRestaurantRepository.updateRestaurant(
      restaurantId,
      updateRestaurantDto,
    );
  }
}
