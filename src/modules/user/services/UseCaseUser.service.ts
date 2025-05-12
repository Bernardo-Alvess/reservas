import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUserDto';
import { genOtp } from 'src/util/genOtp';
import { UseCaseUserRepository } from '../repositories/UseCaseUserRepository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCaseUserService {
  constructor(private readonly useCaseUserRepository: UseCaseUserRepository) {}

  async createUser(user: CreateUserDto) {
    Logger.log('Criando ou atualizando OTP do usuário');
    const otpNumber = genOtp();
    console.log(otpNumber);
    const otp = await bcrypt.hash(otpNumber, await bcrypt.genSalt());
    return await this.useCaseUserRepository.createUser(user, otp);
  }
}
