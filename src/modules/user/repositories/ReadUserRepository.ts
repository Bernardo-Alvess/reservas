import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserAuthMessages } from '../messages/UserAuthMessages';

@Injectable()
export class ReadUserRepository {
  @InjectModel(User.name) private readonly userModel: Model<User>;

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    // if (!user) throw new NotFoundException(UserAuthMessages.USER_NOT_FOUND);

    return user;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(UserAuthMessages.USER_NOT_FOUND);

    return user;
  }

  async listUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async findByRestaurantId(restaurantId: string) {
    const user = await this.userModel.find({ restaurantId });

    if (!user) throw new NotFoundException(UserAuthMessages.USER_NOT_FOUND);

    return user;
  }

  async getStats(restaurantId: string) {
    const stats = await this.userModel.aggregate([
      {
        $match: { restaurantId },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          activeUsers: {
            $sum: { $cond: [{ $eq: ['$active', true] }, 1, 0] },
          },
          inactiveUsers: {
            $sum: { $cond: [{ $eq: ['$active', false] }, 1, 0] },
          },
          adminUsers: {
            $sum: { $cond: [{ $eq: ['$type', 'admin'] }, 1, 0] },
          },
          workerUsers: {
            $sum: { $cond: [{ $eq: ['$type', 'worker'] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          activeUsers: 1,
          inactiveUsers: 1,
          adminUsers: 1,
          workerUsers: 1,
        },
      },
    ]);

    return (
      stats[0] || {
        total: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        adminUsers: 0,
        workerUsers: 0,
      }
    );
  }
}
