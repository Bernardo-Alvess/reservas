import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UseCaseReserveRepository } from '../repository/UseCaseReserveRepository';
import { CreateReserveDto } from '../dto/CreateReserveDto';
import { ReadRestaurantService } from 'src/modules/restaurant/services/ReadRestaurant.service';
import { AssignTableDto } from '../dto/AssignTableDto';
import { ReadReserveRepository } from '../repository/ReadReserveRepository';
import { ReadTableService } from 'src/modules/tables/services/ReadTable.service';
import { MailerService } from 'src/modules/mailer/mailer.service';
import {
  ReservationCreatedEmailTemplate,
  ReservationCancelledEmailTemplate,
} from 'src/modules/mailer/mailer.templates';
import { formatInTimeZone } from 'date-fns-tz';
import { UserCaseUserService } from 'src/modules/user/services/UseCaseUser.service';
import { ReadUserService } from 'src/modules/user/services/ReadUser.service';

@Injectable()
export class UseCaseReserveService {
  constructor(
    private readonly useCaseReserveRepository: UseCaseReserveRepository,
    private readonly readRestaurantService: ReadRestaurantService,
    private readonly readReserveRepository: ReadReserveRepository,
    private readonly readTableService: ReadTableService,
    private readonly mailerService: MailerService,
    private readonly useCaseUserService: UserCaseUserService,
    private readonly readUserService: ReadUserService,
  ) {}

  async createReserve(
    reserve: CreateReserveDto,
    clientId?: string,
    isRestaurant = false,
  ) {
    if (!clientId) {
      try {
        const clientAlreadyExists = await this.readUserService.findUserByEmail(
          reserve.email,
        );

        clientId = clientAlreadyExists.id.toString();
      } catch (error) {
        console.log(error);
        const client = await this.useCaseUserService.createUser(
          {
            email: reserve.email,
          },
          false,
        );
        clientId = client.id;
      }
    }

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

    // Verificar disponibilidade de mesas antes de criar a reserva
    const reserveWithTimes = {
      ...reserve,
      startTime,
      endTime,
    };

    // Verificar se existem mesas disponíveis antes de criar a reserva
    const availableTable = await this.checkTableAvailability(reserveWithTimes);

    if (!availableTable) {
      throw new ConflictException(
        'Não há mesas disponíveis para esta reserva na data e horário solicitado.',
      );
    }
    // Criar a reserva apenas se houver mesa disponível
    const newReserve = await this.useCaseReserveRepository.createReserve(
      reserveWithTimes,
      clientId.toString(),
    );

    // Atribuir a mesa encontrada à reserva
    await this.useCaseReserveRepository.assignTableToReserve(
      availableTable.tableId,
      newReserve._id.toString(),
      availableTable.tableNumber,
    );

    await this.confirmReserve(newReserve._id.toString(), 'restaurant');

    if (isRestaurant) {
      await this.confirmReserve(newReserve._id.toString(), 'client');
    }
    const updatedReserve = await this.readReserveRepository.findReserveById(
      newReserve._id.toString(),
    );

    this.mailerService.sendEmail(
      reserve.email,
      'Reserva efetuada com sucesso',
      ReservationCreatedEmailTemplate({
        userName: reserve.name,
        restaurantName: restaurant.name,
        reservationDate: formatInTimeZone(
          reserve.startTime,
          'America/Sao_Paulo',
          'yyyy-MM-dd',
        ),
        reservationTime: formatInTimeZone(
          reserve.startTime,
          'America/Sao_Paulo',
          'HH:mm',
        ),
        guests: reserve.amountOfPeople,
        confirmLink:
          process.env.NODE_ENV === 'production'
            ? `https://reservas-back-fuor.onrender.com/api/reserve/confirm/client/${newReserve._id}`
            : `http://localhost:3500/api/reserve/confirm/client/${newReserve._id}`,
        cancelLink:
          process.env.NODE_ENV === 'production'
            ? `https://reservas-back-fuor.onrender.com/api/reserve/cancel/client/${newReserve._id}`
            : `http://localhost:3500/api/reserve/cancel/client/${newReserve._id}`,
      }),
    );

    return updatedReserve;
  }

  // Método para verificar disponibilidade de mesa antes de criar a reserva
  private async checkTableAvailability(
    reserve: CreateReserveDto & { endTime: Date },
  ) {
    const { restaurantId, amountOfPeople, startTime, endTime } = reserve;
    try {
      const availableTables = await this.readTableService.listTables(
        restaurantId,
        false,
      );
      const suitableTables = availableTables.filter(
        (table) => table.numberOfSeats >= amountOfPeople,
      );

      if (suitableTables.length === 0) {
        Logger.warn(
          `Não existem mesas que comportam ${amountOfPeople} pessoas no restaurante ${restaurantId}`,
        );
        return null;
      }

      const sortedTables = suitableTables.sort(
        (a, b) => a.numberOfSeats - b.numberOfSeats,
      );

      // Verificar disponibilidade de horário para cada mesa
      for (const table of sortedTables) {
        const tempAssignTableDto: AssignTableDto = {
          tableId: table._id.toString(),
          reserveId: 'temp', // Valor temporário, não usado na verificação
        };

        const hasConflict =
          await this.readReserveRepository.findConflictingReservations(
            tempAssignTableDto,
            startTime,
            endTime,
          );

        if (!hasConflict) {
          // Retornar a primeira mesa disponível
          return {
            tableId: table._id.toString(),
            tableNumber: table.tableNumber,
          };
        }
      }

      Logger.warn(
        `Não há mesas disponíveis para ${amountOfPeople} pessoas no horário solicitado`,
      );
      return null;
    } catch (error) {
      Logger.error(
        `Erro ao verificar disponibilidade de mesas: ${error.message}`,
      );
      return null;
    }
  }

  private async autoAssignTable(reserve: CreateReserveDto, reserveId: string) {
    const { restaurantId, amountOfPeople, startTime, endTime } = reserve;
    try {
      const availableTables = await this.readTableService.listTables(
        restaurantId,
        false,
      );
      const suitableTables = availableTables.filter(
        (table) => table.numberOfSeats >= amountOfPeople,
      );

      if (suitableTables.length === 0) {
        Logger.warn(
          `Não foi possível encontrar mesa disponível para a reserva ${reserveId}`,
        );
        return new ConflictException(
          'Não há mesas que comportam o número de pessoas da reserva',
        );
      }

      const sortedTables = suitableTables.sort(
        (a, b) => a.numberOfSeats - b.numberOfSeats,
      );
      console.log(sortedTables);
      for (const table of sortedTables) {
        const assignTableDto: AssignTableDto = {
          tableId: table._id.toString(),
          reserveId: reserveId,
        };

        const hasConflict =
          await this.readReserveRepository.findConflictingReservations(
            assignTableDto,
            startTime,
            endTime,
          );

        if (!hasConflict) {
          await this.useCaseReserveRepository.assignTableToReserve(
            table._id.toString(),
            reserveId,
            table.tableNumber,
          );
          Logger.log(
            `Mesa ${table.tableNumber} atribuída automaticamente à reserva ${reserveId}`,
          );
          return true;
        }
      }

      Logger.warn(
        `Não foi possível encontrar mesa disponível para a reserva ${reserveId}`,
      );
      return false;
    } catch (error) {
      Logger.error(`Erro ao atribuir mesa automaticamente: ${error.message}`);
      return false;
    }
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

  async confirmReserve(id: string, type: 'client' | 'restaurant') {
    const reserve = await this.readReserveRepository.findReserveById(id);

    if (!reserve) {
      throw new NotFoundException('Reserva não encontrada');
    }
    let updatedReserve;
    switch (type) {
      case 'restaurant':
        if (!reserve.tableId) {
          Logger.error('Reserva não possui uma mesa atribuída');
          return {
            status: 'error',
            message: 'Reserva não possui uma mesa atribuída',
          };
        }
        updatedReserve = await this.useCaseReserveRepository.confirmReserve(
          id,
          type,
        );
        return updatedReserve;
        break;
      case 'client':
        updatedReserve = await this.useCaseReserveRepository.confirmReserve(
          id,
          type,
        );
        return updatedReserve;
        break;
      default:
        throw new BadRequestException('Tipo de confirmação inválido');
    }
    return updatedReserve;
  }

  async cancelReserve(id: string, type: 'client' | 'restaurant') {
    const reserve = await this.readReserveRepository.findReserveById(id);

    if (!reserve) {
      throw new NotFoundException('Reserva não encontrada');
    }
    let updatedReserve;
    switch (type) {
      case 'restaurant':
        if (!reserve.tableId) {
          Logger.error('Reserva não possui uma mesa atribuída');
          return {
            status: 'error',
            message: 'Reserva não possui uma mesa atribuída',
          };
        }
        updatedReserve = await this.useCaseReserveRepository.cancelReserve(
          id,
          type,
        );

        const restaurant = await this.readRestaurantService.findRestaurantById(
          reserve.restaurantId.toString(),
        );

        await this.mailerService.sendEmail(
          reserve.email,
          'Reserva cancelada',
          ReservationCancelledEmailTemplate({
            userName: reserve.name,
            restaurantName: restaurant.name,
            reservationDate: formatInTimeZone(
              reserve.startTime,
              'America/Sao_Paulo',
              'yyyy-MM-dd',
            ),
            reservationTime: formatInTimeZone(
              reserve.startTime,
              'America/Sao_Paulo',
              'HH:mm',
            ),
          }),
        );
        return updatedReserve;
      case 'client':
        updatedReserve = await this.useCaseReserveRepository.cancelReserve(
          id,
          type,
        );
        return updatedReserve;
      default:
        throw new BadRequestException('Tipo de confirmação inválido');
    }
  }

  async checkInReserve(id: string) {
    const reserve = await this.readReserveRepository.findReserveById(id);
    if (!reserve) {
      throw new NotFoundException('Reserva não encontrada');
    }
    if (reserve.status !== 'Confirmada') {
      throw new BadRequestException('Reserva não confirmada');
    }
    if (reserve?.checkedIn) {
      throw new BadRequestException('Reserva já foi marcada como confirmada');
    }
    const updatedReserve =
      await this.useCaseReserveRepository.checkInReserve(id);

    return updatedReserve;
  }
}
