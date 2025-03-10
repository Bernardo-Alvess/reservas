import { Injectable } from '@nestjs/common';
import { UseCaseReserveRepository } from '../repository/UseCaseReserveRepository';
import { CreateReserveDto } from '../dto/CreateReserveDto';

@Injectable()
export class UseCaseReserveService {
  constructor(
    private readonly useCaseReserveRepository: UseCaseReserveRepository,
  ) {}

  async createReserve(reserve: CreateReserveDto, clientId: string) {
    const newReserve = await this.useCaseReserveRepository.createReserve(
      reserve,
      clientId,
    );
    return newReserve;
  }
}
