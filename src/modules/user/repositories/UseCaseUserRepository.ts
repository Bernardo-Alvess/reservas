import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserTypeEnum } from '../user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/CreateUserDto';

@Injectable()
export class UseCaseUserRepository {
  @InjectModel(User.name) private readonly userModel: Model<User>;

  async createUser(user: CreateUserDto, password?: string) {
    const isUser = await this.userModel.findOne({ email: user.email });
    if (isUser) {
      return await this.updateUserPassword(user, password);
    }

    if (password) {
      await this.userModel.create({ email: user.email, password });
      return { email: user.email, password };
    }

    // if (user.type === UserTypeEnum.COMPANY) {
    //   await this.userModel.create({
    //     ...user,
    //   });
    //   return user;
    // }

    await this.userModel.create({
      ...user,
      type: user.type || UserTypeEnum.USER,
    });
    return user;
  }

  async updateUserPassword(user: CreateUserDto, password: string) {
    return await this.userModel.findOneAndUpdate(
      { email: user.email },
      { password },
    );
  }
}
