import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReadUserRepository } from '../repositories/ReadUserRepository';
import { UserTypeEnum } from '../user.schema';
import { ReadRestaurantRepository } from 'src/modules/restaurant/repositories/ReadRestaurantRepository';

@Injectable()
export class ReadUserService {
  constructor(
    private readonly readUserRepository: ReadUserRepository,
    private readonly readRestaurantRepository: ReadRestaurantRepository,
  ) {}

  async checkIfUserExists(email: string, id: string) {
    const user = await this.readUserRepository.findByEmail(email);

    if (user && user._id.toString() !== id) {
      throw new BadRequestException('Email já cadastrado');
    }

    return user;
  }

  async listUsers() {
    return await this.readUserRepository.listUsers();
  }

  async findUserByEmail(email: string) {
    const user = await this.readUserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.type === UserTypeEnum.USER) {
      return {
        id: user._id,
        email: user.email,
        name: user.name,
        type: user.type,
      };
    }

    if (user.type === UserTypeEnum.COMPANY) {
      const restaurant =
        await this.readRestaurantRepository.listRestaurantsByCompanyId(
          user.companyId.toString(),
        );
      return {
        id: user._id,
        email: user.email,
        name: user.name,
        type: user.type,
        restaurant,
      };
    }

    const restaurant = await this.readRestaurantRepository.findRestaurantById(
      user.restaurantId.toString(),
    );

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      type: user.type,
      restaurant: [restaurant],
    };
  }

  async findUserById(id: string) {
    return await this.readUserRepository.findById(id);
  }

  async findByRestaurantId(restaurntId: string) {
    const user = await this.readUserRepository.findByRestaurantId(restaurntId);
    return user;
  }

  async getUserStats(restaurantId: string) {
    const stats = await this.readUserRepository.getStats(restaurantId);
    return stats;
  }
}
