import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUserDto';
import { genOtp } from 'src/util/genOtp';
import { UseCaseUserRepository } from '../repositories/UseCaseUserRepository';
import * as bcrypt from 'bcrypt';
import { UserTypeEnum } from '../user.schema';
import { ReadRestaurantService } from 'src/modules/restaurant/services/ReadRestaurant.service';
import { MailerService } from 'src/modules/mailer/mailer.service';
import { OTPEmailTemplate } from 'src/modules/mailer/mailer.templates';

@Injectable()
export class UserCaseUserService {
  constructor(
    private readonly useCaseUserRepository: UseCaseUserRepository,
    private readonly restaurantService: ReadRestaurantService,
    private readonly mailerService: MailerService,
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

    await this.mailerService.sendEmail(
      user.email,
      'Senha de acesso ReservaFácil',
      OTPEmailTemplate({ code: password, userName: user.email }),
    );

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    return await this.useCaseUserRepository.createUser(user, hashedPassword);
  }

  async changeStatusUser(userId: string) {
    return await this.useCaseUserRepository.changeStatusUser(userId);
  }

  async changeRoleUser(userId: string, type: UserTypeEnum) {
    return await this.useCaseUserRepository.changeRoleUser(userId, type);
  }

  async deleteUser(userId: string) {
    return await this.useCaseUserRepository.deleteUser(userId);
  }
}
