import { ConflictException, Injectable } from '@nestjs/common';
import { UseCaseReserveRepository } from '../repository/UseCaseReserveRepository';
import { CreateReserveDto } from '../dto/CreateReserveDto';
import { ReadRestaurantService } from 'src/modules/restaurant/services/ReadRestaurant.service';
import { AssignTableDto } from '../dto/AssignTableDto';
import { ReadReserveRepository } from '../repository/ReadReserveRepository';

@Injectable()
export class UseCaseReserveService {
  constructor(
    private readonly useCaseReserveRepository: UseCaseReserveRepository,
    private readonly readRestaurantService: ReadRestaurantService,
    private readonly readReserveRepository: ReadReserveRepository,
  ) {}

  async createReserve(reserve: CreateReserveDto, clientId: string) {
    const restaurant = await this.readRestaurantService.findRestaurantById(
      reserve.restaurantId,
    );

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    const startTime = new Date(reserve.startTime);
    let endTime: Date;

    if (restaurant.maxReservationTime) {
      endTime = new Date(
        startTime.getTime() + restaurant.maxReservationTime * 60 * 1000,
      );
    } else {
      endTime = new Date(startTime);
      endTime.setHours(23, 59, 59, 999);
    }

    const newReserve = await this.useCaseReserveRepository.createReserve(
      {
        ...reserve,
        startTime,
        endTime,
      },
      clientId,
    );
    return newReserve;
  }

  async assignTable( assignTableDto: AssignTableDto) {
    const conflictingReservations = await this.readReserveRepository.findConflictingReservations(assignTableDto);
    console.log(conflictingReservations)
    // if(!conflictingReservations) {
    //   // aplicar reserva a mesa
    //   throw new ConflictException('Mesa já reservada nesse horário.');
    // }
    
    const reserve = await this.useCaseReserveRepository.assignTableToReserve(assignTableDto.tableId, assignTableDto.reserveId);
    return {conflictingReservations}
  }
}
