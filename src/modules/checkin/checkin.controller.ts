import { Controller, Post, Param, Body } from '@nestjs/common';
import { CheckinService } from './checkin.service';

@Controller('checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Post(':restaurantId')
  async checkin(
    @Param('restaurantId') restaurantId: string,
    @Body('email') email: string,
  ) {
    return await this.checkinService.checkin(restaurantId, email);
  }
}
