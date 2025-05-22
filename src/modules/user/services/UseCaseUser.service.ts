import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUserDto';
import { genOtp } from 'src/util/genOtp';
import { UseCaseUserRepository } from '../repositories/UseCaseUserRepository';
import * as bcrypt from 'bcrypt';
import { UserTypeEnum } from '../user.schema';
import { ReadRestaurantService } from 'src/modules/restaurant/services/ReadRestaurant.service';

@Injectable()
export class UserCaseUserService {
  constructor(
    private readonly useCaseUserRepository: UseCaseUserRepository,
    private readonly restaurantService: ReadRestaurantService,
  ) {}

  async createUser(user: CreateUserDto) {
    if (user.type === UserTypeEnum.ADMIN || user.type === UserTypeEnum.WORKER) {
      Logger.log(`Criando usuário do tipo ${user.type}`);
      if (!user.restaurantId) {
        throw new BadRequestException('O ID do restaurante é obrigatório');
      }

      const restaurant = await this.restaurantService.findRestaurantById(
        user.restaurantId,
      );

      if (!restaurant) {
        throw new BadRequestException('Restaurante não encontrado');
      }

      const encryptedPassword = await bcrypt.hash(
        user.password,
        await bcrypt.genSalt(),
      );

      user.password = encryptedPassword;
      return await this.useCaseUserRepository.createUser(user, undefined);
    } else if (user.type === UserTypeEnum.COMPANY) {
      return await this.useCaseUserRepository.createUser(user, undefined);
    }

    Logger.log('Criando ou atualizando senha do usuário');
    const password = genOtp();

    //enviar por email para ele

    console.log(password);
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    return await this.useCaseUserRepository.createUser(user, hashedPassword);
  }
}
