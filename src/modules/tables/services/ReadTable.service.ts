import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadTableRepository } from '../repositories/ReadTable.repository';

@Injectable()
export class ReadTableService {
  constructor(private readonly readTableRepository: ReadTableRepository) {}

  async findTableById(tableId: string) {
    const table = await this.readTableRepository.findTableById(tableId);
    if (!table) throw new NotFoundException('Mesa não encontrada.');
    return table;
  }

  async listTables(restaurantId, isReserved?: boolean) {
    const tables = await this.readTableRepository.findAllTables(
      restaurantId,
      isReserved,
    );
    return tables;
  }
}
