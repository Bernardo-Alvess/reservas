import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CompanyGuard } from 'src/modules/company/guard/company.guard';
import { ReadRestaurantService } from '../services/ReadRestaurant.service';

//Depois criar uma listMine - para listar deixar as empresas verem os restaurantes delas ou algo com nome parecido

@UseGuards(CompanyGuard)
@Controller('restaurant')
export class ReadRestaurantController {
  constructor(private readonly readRestaurantService: ReadRestaurantService) {}

  @Get()
  async listRestaurants() {
    return this.readRestaurantService.listAll();
  }

  @Get(':restaurantId')
  async findRestaurantById(@Param('restaurantId') restaurantId: string) {
    return this.readRestaurantService.findRestaurantById(restaurantId);
  }
}
