import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCaseReserveRepository } from '../repository/UseCaseReserveRepository';
import { CreateReserveDto } from '../dto/CreateReserveDto';
import { ReadRestaurantService } from 'src/modules/restaurant/services/ReadRestaurant.service';
import { AssignTableDto } from '../dto/AssignTableDto';
import { ReadReserveRepository } from '../repository/ReadReserveRepository';
import { ReadTableService } from 'src/modules/tables/services/ReadTable.service';
import { CPFVerificationService } from './CPFVerification.service';
import { UserCaseUserService } from 'src/modules/user/services/UseCaseUser.service';
import { ReadUserService } from 'src/modules/user/services/ReadUser.service';

@Injectable()
export class UseCaseReserveService {
  constructor(
    private readonly useCaseReserveRepository: UseCaseReserveRepository,
    private readonly readRestaurantService: ReadRestaurantService,
    private readonly readReserveRepository: ReadReserveRepository,
    private readonly readTableService: ReadTableService,
    private readonly cpfVerificationService: CPFVerificationService,
    private readonly createUserService: UserCaseUserService,
    private readonly readUserService: ReadUserService,
  ) {}

  async createReserve(reserve: CreateReserveDto) {
    if (process.env.ENVIRONMENT !== 'dev') {
      const cpfVerification = await this.cpfVerificationService.verifyCPF(
        reserve.cpf,
        reserve.birthDate,
      );

      if (!cpfVerification) {
        throw new UnauthorizedException(
          'CPF inválido ou não corresponde à data de nascimento',
        );
      }
    }

    let user: any = await this.readUserService.findUserByEmail(reserve.email);

    if (!user) {
      Logger.log('Usuário não encontrado, criando novo usuário');
      const newUser = await this.createUserService.createUser({
        email: reserve.email,
      });
      user = newUser;
    }

    const clientId = user._id;
    const restaurant = await this.readRestaurantService.findRestaurantById(
      reserve.restaurantId,
    );

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
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

  async assignTable(assignTableDto: AssignTableDto) {
    const reserve = await this.readReserveRepository.findReserveById(
      assignTableDto.reserveId,
    );
    const table = await this.readTableService.findTableById(
      assignTableDto.tableId,
    );
    // console.table([reserve.toJSON(), table.toJSON()])

    if (!reserve || !table) {
      throw new NotFoundException('Reserva ou mesa não encontrada');
    }

    if (reserve.amountOfPeople > table.numberOfSeats) {
      throw new ConflictException('Mesa não suporta o número de pessoas.');
    }

    const startTime = new Date(reserve.startTime);
    const endTime = new Date(reserve.endTime);

    const conflictingReservations =
      await this.readReserveRepository.findConflictingReservations(
        assignTableDto,
        startTime,
        endTime,
      );

    if (conflictingReservations) {
      throw new ConflictException('Mesa já reservada nesse horário.');
    }

    const assignedReserve =
      await this.useCaseReserveRepository.assignTableToReserve(
        assignTableDto.tableId,
        assignTableDto.reserveId,
        table.tableNumber,
      );
    return { assignedReserve };
  }
}
