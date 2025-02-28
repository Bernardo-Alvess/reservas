import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserAuthMessages } from "../messages/UserAuthMessages";

@Injectable()
export class ReadUserRepository {
  @InjectModel(User.name) private readonly userModel: Model<User>;

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException(UserAuthMessages.USER_NOT_FOUND);

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
}
