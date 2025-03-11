import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UseCaseReserveService } from '../service/UseCaseReserve.sevice';
import { CreateReserveDto } from '../dto/CreateReserveDto';
import { UserGuard } from 'src/modules/user/guard/user.guard';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { TokenUserJwtService } from 'src/modules/user/guard/UserJwt.service';

@Controller('reserve')
export class UseCaseReserveController {
  constructor(
    private readonly useCaseReserveService: UseCaseReserveService,
    private readonly userJwtService: TokenUserJwtService,
  ) {}

  @UseGuards(UserGuard)
  @Post()
  async createReserve(
    @Body() reserve: CreateReserveDto,
    @Cookies('sessionToken') sessionToken: string,
  ) {
    const API_KEY = 'AJFDLKASJFLDKSJA123KJl#44089053280123';
    console.log(API_KEY);
    const payload = await this.userJwtService.checkSessionToken(sessionToken);
    const clientId = payload.sub;
    return this.useCaseReserveService.createReserve(reserve, clientId);
  }
}
