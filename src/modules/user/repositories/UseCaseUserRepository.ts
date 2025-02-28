import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/CreateUserDto";

@Injectable()
export class UseCaseUserRepository {
  @InjectModel(User.name) private readonly userModel: Model<User>;

  async createUser(user: CreateUserDto, otp: string) {
    const isUser = await this.userModel.findOne({ email: user.email });
    if (isUser) {
      return await this.updateUserOtp(user, otp);
    }

    await this.userModel.create({ email: user.email, otp });
    return { email: user.email, otp };
  }

  async updateUserOtp(user: CreateUserDto, otp: string) {
    return await this.userModel.findOneAndUpdate(
      { email: user.email },
      { otp },
    );
  }
}
