import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCaseRestaurantRepository } from '../repositories/UseCaseRestaurantRepository';
import { CreateRestaurantDto } from '../dto/CreateRestaurantDto';
import { TokenCompanyJwtService } from 'src/modules/company/guard/CompanyJwt.service';
import { ReadCompanyRepository } from 'src/modules/company/repositories/ReadCompanyRepository';
import { CreateCompanyMessages } from 'src/modules/company/messages/CompanyMessages';
import { ReadRestaurantRepository } from '../repositories/ReadRestaurantRepository';
import { RestaurantMessages } from '../messages/RestaurantMessages';
import { QrCodeService } from './QrCode.service';
import { UpdateRestaurantDto } from '../dto/UpdateRestaurantDto';

@Injectable()
export class UseCaseRestaurantService {
  constructor(
    private readonly useCaseRestaurantRepository: UseCaseRestaurantRepository,
    private readonly companyTokenService: TokenCompanyJwtService,
    private readonly readCompanyRepository: ReadCompanyRepository,
    private readonly readRestaurantRepository: ReadRestaurantRepository,
    private readonly qrCodeService: QrCodeService,
  ) {}

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
    sessionTokenR: string,
  ) {
    Logger.log('Criando Restaurante', UseCaseRestaurantService.name);
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

    Logger.log('Gerando QR Code', UseCaseRestaurantService.name);
    const qrCodeUrl = await this.qrCodeService.generateQrCodeForRestaurant(
      restaurant._id.toString(),
    );

    Logger.log(
      'Atualizando Restaurante com QR Code',
      UseCaseRestaurantService.name,
    );
    const updatedRestaurant = await this.updateQrCodeUrl(
      qrCodeUrl,
      restaurant._id.toString(),
    );

    return updatedRestaurant;
  }

  async updateRestaurant(
    restaurantId: string,
    updateRestaurantDto: UpdateRestaurantDto,
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

  async updateQrCodeUrl(qrCodeUrl: string, restaurantId: string) {
    return await this.useCaseRestaurantRepository.updateQrCodeUrl(
      qrCodeUrl,
      restaurantId,
    );
  }
}
