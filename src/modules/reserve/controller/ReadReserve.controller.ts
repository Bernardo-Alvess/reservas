import { Controller, Get } from '@nestjs/common';
import { ReadReserveService } from '../service/ReadReserve.service';

@Controller('reserve')
export class ReadReserveController {
  constructor(private readonly readReserveService: ReadReserveService) {}

  @Get()
  async listReserves() {
    return this.readReserveService.listReserves();
  }

  async findByRestaurantId(restaurantId: string) {
    return this.readReserveService.findByRestaurantId(restaurantId);
  }

  async findByClientId(clientId: string) {
    return this.readReserveService.findByClientId(clientId);
  }

  async findReserveById(reserveId: string) {
    return this.readReserveService.findReserveById(reserveId);
  }
}
