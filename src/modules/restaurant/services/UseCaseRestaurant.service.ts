import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCaseRestaurantRepository } from '../repositories/UseCaseRestaurantRepository';
import { CreateRestaurantDto } from '../dto/CreateRestaurantDto';
import { ReadCompanyRepository } from 'src/modules/company/repositories/ReadCompanyRepository';
import { CreateCompanyMessages } from 'src/modules/company/messages/CompanyMessages';
import { ReadRestaurantRepository } from '../repositories/ReadRestaurantRepository';
import { RestaurantMessages } from '../messages/RestaurantMessages';
import { TokenUserJwtService } from 'src/modules/user/guard/UserJwt.service';
import { GalleryDto, MenuDto, ProfileImageDto } from '../restaurant.schema';
import { QrCodeService } from './QrCode.service';

@Injectable()
export class UseCaseRestaurantService {
  constructor(
    private readonly useCaseRestaurantRepository: UseCaseRestaurantRepository,
    private readonly userTokenService: TokenUserJwtService,
    private readonly readCompanyRepository: ReadCompanyRepository,
    private readonly readRestaurantRepository: ReadRestaurantRepository,
    private readonly qrCodeService: QrCodeService,
  ) {}

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
    sessionTokenR: string,
  ) {
    const payload =
      await this.userTokenService.checkSessionToken(sessionTokenR);
    const companyId = payload.companyId;
    const company = await this.readCompanyRepository.findCompanyById(companyId);

    if (!company)
      throw new NotFoundException(CreateCompanyMessages.COMPANY_NOT_FOUND);

    const restaurant = await this.useCaseRestaurantRepository.createRestaurant(
      createRestaurantDto,
      companyId,
    );

    const qrCode = await this.qrCodeService.generateQrCode(
      restaurant._id.toString(),
    );

    const restaurantWithQrCode =
      await this.useCaseRestaurantRepository.setQrCode(
        restaurant._id.toString(),
        qrCode,
      );

    return restaurantWithQrCode;
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

  async updateProfileImage(
    restaurantId: string,
    profileImage: ProfileImageDto,
  ) {
    const restaurant = await this.readRestaurantRepository.findRestaurantById(
      restaurantId.toString(),
    );

    if (!restaurant)
      throw new NotFoundException(RestaurantMessages.RESTAURANT_NOT_FOUND);

    return await this.useCaseRestaurantRepository.updateProfileImage(
      restaurantId,
      profileImage,
    );
  }

  async updateMenu(restaurantId: string, menu: MenuDto) {
    const restaurant = await this.readRestaurantRepository.findRestaurantById(
      restaurantId.toString(),
    );

    if (!restaurant)
      throw new NotFoundException(RestaurantMessages.RESTAURANT_NOT_FOUND);

    return await this.useCaseRestaurantRepository.updateMenu(
      restaurantId,
      menu,
    );
  }

  async updateGallery(restaurantId: string, gallery: GalleryDto[]) {
    const restaurant = await this.readRestaurantRepository.findRestaurantById(
      restaurantId.toString(),
    );

    if (!restaurant)
      throw new NotFoundException(RestaurantMessages.RESTAURANT_NOT_FOUND);

    return await this.useCaseRestaurantRepository.updateGallery(
      restaurantId,
      gallery,
    );
  }

  async deleteGalleryImage(restaurantId: string, publicId: string) {
    const restaurant = await this.readRestaurantRepository.findRestaurantById(
      restaurantId.toString(),
    );

    if (!restaurant)
      throw new NotFoundException(RestaurantMessages.RESTAURANT_NOT_FOUND);

    return await this.useCaseRestaurantRepository.deleteGalleryImage(
      restaurantId,
      publicId,
    );
  }
}
