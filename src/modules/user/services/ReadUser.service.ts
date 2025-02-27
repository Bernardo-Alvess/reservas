import { Injectable } from '@nestjs/common';
import { ReadUserRepository } from '../repositories/ReadUserRepository';

@Injectable()
export class ReadUserService {
  constructor(private readonly readUserRepository: ReadUserRepository) {}

  async listUsers() {
    return await this.readUserRepository.listUsers();
  }

  async findUserByEmail(email: string) {
    return await this.readUserRepository.findByEmail(email);
  }
}
