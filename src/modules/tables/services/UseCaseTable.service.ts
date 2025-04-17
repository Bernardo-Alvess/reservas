import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from '../dto/CreateTableDto';
import { UseCaseTableRepository } from '../repositories/UseCaseTable.repository';
import { UpdateTableDto } from '../dto/UpdateTableDto';
import { ReadRestaurantRepository } from 'src/modules/restaurant/repositories/ReadRestaurantRepository';
import { ReadReserveRepository } from 'src/modules/reserve/repository/ReadReserveRepository';
import { AssignTableDto } from '../../reserve/dto/AssignTableDto';

@Injectable()
export class UseCaseTableService {
  
  constructor(
    private readonly useCaseTableRepository: UseCaseTableRepository,
    private readonly readRestaurantRepository: ReadRestaurantRepository,
    private readonly readReserveRepository: ReadReserveRepository,
  ) {}

  async createTable(createTableDto: CreateTableDto) {
    if (createTableDto.restaurantId) {
      const restaurant = await this.readRestaurantRepository.findRestaurantById(
        createTableDto.restaurantId,
      );
      if (!restaurant)
        throw new NotFoundException('Restaurante não encontrado.');
    }

    if (createTableDto.currentReservation) {
      const reserve = await this.readReserveRepository.findReserveById(
        createTableDto.currentReservation,
      );
      if (!reserve) throw new NotFoundException('Reserva não encontrada.');
    }

    return await this.useCaseTableRepository.createTable(createTableDto);
  }

  async updateTable(updateTableDto: UpdateTableDto) {
    //Verificar se a reserva é válida
    if (updateTableDto.currentReservation) {
      const reserve = await this.readReserveRepository.findReserveById(
        updateTableDto.currentReservation,
      );
      if (!reserve) throw new NotFoundException('Reserva não encontrada.');
    }
    return await this.useCaseTableRepository.updateTable(updateTableDto);
  }
}
