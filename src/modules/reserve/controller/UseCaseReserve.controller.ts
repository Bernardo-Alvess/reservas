import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UseCaseReserveService } from '../service/UseCaseReserve.sevice';
import { CreateReserveDto } from '../dto/CreateReserveDto';
import { UserGuard } from 'src/modules/user/guard/user.guard';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { TokenUserJwtService } from 'src/modules/user/guard/UserJwt.service';
import { CompanyGuard } from 'src/modules/company/guard/company.guard';
import { AssignTableDto } from '../dto/AssignTableDto';

@Controller('reserve')
export class UseCaseReserveController {
  constructor(
    private readonly useCaseReserveService: UseCaseReserveService,
    private readonly userJwtService: TokenUserJwtService,
  ) {}

  @Post('assign-table')
  async assingTable (@Body() assignTableDto: AssignTableDto) {
    return await this.useCaseReserveService.assignTable(assignTableDto);
  }

  @UseGuards(UserGuard)
  @Post()
  async createReserve(
    @Body() reserve: CreateReserveDto,
    @Cookies('sessionToken') sessionToken: string,
  ) {
    const payload = await this.userJwtService.checkSessionToken(sessionToken);
    const clientId = payload.sub;
    return this.useCaseReserveService.createReserve(reserve, clientId);
  }
}
