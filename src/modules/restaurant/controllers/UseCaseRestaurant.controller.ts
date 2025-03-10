import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { UseCaseRestaurantService } from '../services/UseCaseRestaurant.service';
import { CreateRestaurantDto } from '../dto/CreateRestaurantDto';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { CompanyGuard } from 'src/modules/company/guard/company.guard';

@UseGuards(CompanyGuard)
@Controller('restaurant')
export class UseCaseRestaurantController {
  constructor(
    private readonly useCaseRestaurantService: UseCaseRestaurantService,
  ) {}
  @Post('/create')
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Cookies('sessionTokenR') sessionTokenR: string,
  ) {
    return await this.useCaseRestaurantService.createRestaurant(
      createRestaurantDto,
      sessionTokenR,
    );
  }

  @Patch('/:restaurantId')
  async updateRestaurant(
    @Param('restaurantId') restaurantId: string,
    @Body() updateRestaurantDto: CreateRestaurantDto,
  ) {
    return await this.useCaseRestaurantService.updateRestaurant(
      restaurantId,
      updateRestaurantDto,
    );
  }
}
