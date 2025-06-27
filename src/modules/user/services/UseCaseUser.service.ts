import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUserDto';
import { genOtp } from 'src/util/genOtp';
import { UseCaseUserRepository } from '../repositories/UseCaseUserRepository';
import * as bcrypt from 'bcrypt';
import { UserTypeEnum } from '../user.schema';
import { ReadRestaurantService } from 'src/modules/restaurant/services/ReadRestaurant.service';
import { MailerService } from 'src/modules/mailer/mailer.service';
import {
  OTPEmailTemplate,
  ForgotPasswordEmailTemplate,
  UserAddedToRestaurantEmailTemplate,
} from 'src/modules/mailer/mailer.templates';
import { ReadUserService } from './ReadUser.service';
import { TokenUserJwtService } from '../guard/UserJwt.service';
import { genRandomPass } from 'src/util/genRandomPass';

@Injectable()
export class UserCaseUserService {
  constructor(
    private readonly useCaseUserRepository: UseCaseUserRepository,
    private readonly restaurantService: ReadRestaurantService,
    private readonly mailerService: MailerService,
    private readonly readUserService: ReadUserService,
    private readonly tokenUserJwtService: TokenUserJwtService,
  ) {}

  async createUser(user: CreateUserDto, sendEmail: boolean = true) {
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

      const plainPassword = genRandomPass();

      const encryptedPassword = await bcrypt.hash(
        plainPassword,
        await bcrypt.genSalt(),
      );

      user.password = encryptedPassword;

      await this.mailerService.sendEmail(
        user.email,
        'Você foi adicionado ao sistema ReservaFácil',
        UserAddedToRestaurantEmailTemplate({
          userName: user.name,
          temporaryPassword: plainPassword,
          restaurantName: restaurant.name,
          restaurantType: restaurant.type,
          restaurantAddress: `${restaurant.address.street}, ${restaurant.address.number} - ${restaurant.address.district} - ${restaurant.address.city} - ${restaurant.address.state} - ${restaurant.address.zipCode}`,
          userRole: user.type === UserTypeEnum.ADMIN ? 'admin' : 'funcionario',
          userEmail: user.email,
        }),
      );

      return await this.useCaseUserRepository.createUser(user, undefined);
    } else if (user.type === UserTypeEnum.COMPANY) {
      return await this.useCaseUserRepository.createUser(user, undefined);
    }

    Logger.log('Criando ou atualizando senha do usuário');
    const password = genOtp();

    if (sendEmail) {
      await this.mailerService.sendEmail(
        user.email,
        'Senha de acesso ReservaFácil',
        OTPEmailTemplate({ code: password, userName: user.email }),
      );
    }

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

  async changePassword(userId: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    return await this.useCaseUserRepository.changePassword(
      userId,
      hashedPassword,
    );
  }

  async createToken(email: string) {
    const user = await this.readUserService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    // Criar token JWT com email criptografado e expiração de 1 hora
    const payload = {
      email: user.email,
      purpose: 'password-reset',
      iat: Math.floor(Date.now() / 1000), // timestamp atual
    };

    const resetToken =
      await this.tokenUserJwtService.createPasswordResetToken(payload);

    // Criar link de reset com o token
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    // Enviar email com o link de reset
    await this.mailerService.sendEmail(
      user.email,
      'Redefinição de Senha - ReservaFácil',
      ForgotPasswordEmailTemplate({
        resetLink,
        userName: user.name || user.email,
      }),
    );

    return { message: 'Email de redefinição de senha enviado com sucesso!' };
  }

  async validateResetToken(token: string) {
    try {
      const decoded =
        await this.tokenUserJwtService.verifyPasswordResetToken(token);

      // Verificar se o token é para reset de senha
      if (decoded.purpose !== 'password-reset') {
        throw new BadRequestException('Token inválido');
      }

      // Verificar se o usuário ainda existe
      const user = await this.readUserService.findUserByEmail(decoded.email);
      if (!user) {
        throw new BadRequestException('Usuário não encontrado');
      }

      return {
        email: decoded.email,
        valid: true,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Erro ao validar token, verifique se o link ainda é válido',
      );
    }
  }

  async removePassword(userId: string) {
    const hash = await bcrypt.hash(
      process.env.CHANGE_PASSWORD_DEFAULT_PASSWORD,
      await bcrypt.genSalt(),
    );
    return await this.useCaseUserRepository.removePassword(userId, hash);
  }

  async resetPasswordWithToken(token: string, newPassword: string) {
    // Validar o token e obter o email
    const { email } = await this.validateResetToken(token);

    // Buscar o usuário
    const user = await this.readUserService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    // Criptografar a nova senha
    const hashedPassword = await bcrypt.hash(
      newPassword,
      await bcrypt.genSalt(),
    );

    // Atualizar a senha no banco
    await this.useCaseUserRepository.changePassword(
      user.id.toString(),
      hashedPassword,
    );

    return { message: 'Senha redefinida com sucesso!' };
  }
}
