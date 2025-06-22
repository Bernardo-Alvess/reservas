import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserTypeEnum } from '../user.schema';
import { Model, Types } from 'mongoose';
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
      await this.userModel.create({
        email: user.email,
        password,
        active: true,
      });
      return { id: isUser?._id, email: user.email, password };
    }

    // if (user.type === UserTypeEnum.COMPANY) {
    //   await this.userModel.create({
    //     ...user,
    //   });
    //   return user;
    // }

    const newUser = await this.userModel.create({
      ...user,
      type: user.type || UserTypeEnum.USER,
      active: true,
    });
    return { id: newUser._id, email: newUser.email };
  }

  async updateUserPassword(user: CreateUserDto, password: string) {
    return await this.userModel.findOneAndUpdate(
      { email: user.email },
      { password },
    );
  }

  async changeStatusUser(userId: string) {
    return await this.userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      [
        {
          $set: {
            active: { $not: '$active' },
          },
        },
      ],
    );
  }

  async changeRoleUser(userId: string, type: UserTypeEnum) {
    return await this.userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { type },
    );
  }

  async deleteUser(userId: string) {
    return await this.userModel.findOneAndDelete({
      _id: new Types.ObjectId(userId),
    });
  }
}
