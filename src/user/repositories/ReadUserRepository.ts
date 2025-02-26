import { Injectable } from '@nestjs/common';
import { User } from '../user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReadUserRepository {
  @InjectModel(User.name) private readonly userModel: Model<User>;

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async listUsers() {
    return await this.userModel.find();
  }
}
