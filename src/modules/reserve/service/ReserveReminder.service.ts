import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserve } from '../reserve.schema';
import { MailerService } from '../../mailer/mailer.service';
import { formatInTimeZone } from 'date-fns-tz';
import {
  ReservationAutoCancelledEmailTemplate,
  ReservationReminderEmailTemplate,
} from 'src/modules/mailer/mailer.templates';
import { ReadRestaurantService } from 'src/modules/restaurant/services/ReadRestaurant.service';

@Injectable()
export class ReserveReminderService {
  private readonly logger = new Logger(ReserveReminderService.name);

  constructor(
    @InjectModel(Reserve.name) private readonly reserveModel: Model<Reserve>,
    private readonly mailerService: MailerService,
    private readonly readRestaurantService: ReadRestaurantService,
  ) {}

  @Cron('*/2 * * * *')
  async cancelReserves() {
    try {
      this.logger.log(
        'Cancelando reservas pendentes que não foram confirmadas 30 minutos após o horário',
      );
      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60000);
      const reservesToCancel = await this.reserveModel
        .find({
          startTime: {
            $lt: thirtyMinutesAgo,
          },
          status: 'Pendente',
        })
        .populate('restaurantId')
        .populate('clientId');

      for (const reserve of reservesToCancel) {
        this.logger.log(
          `Reserva ${reserve._id} cancelada automaticamente por falta de confirmação`,
        );
        await this.reserveModel.findByIdAndUpdate(reserve._id, {
          status: 'Cancelada',
          canceledBy: 'system',
          canceledAt: now,
        });

        const restaurant = reserve.restaurantId as any;

        await this.mailerService.sendEmail(
          reserve.email,
          'Reserva cancelada por falta de confirmação',
          ReservationAutoCancelledEmailTemplate({
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
          }),
        );

        this.logger.log(
          `Reserva ${reserve._id} cancelada por falta de confirmação`,
        );
      }
    } catch (error) {
      this.logger.error('Erro ao cancelar reservas:', error);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleReminderCron() {
    try {
      // Calcula o intervalo de tempo para buscar reservas (30 minutos no futuro)
      this.logger.log('Buscando reservas para lembrete');
      const now = new Date();
      const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60000);
      // Busca reservas que começam em 30 minutos e ainda não receberam lembrete
      const reservesToRemind = await this.reserveModel.find({
        startTime: {
          $gt: now,
          $lte: thirtyMinutesFromNow,
        },
        // status: 'Confirmada',
        reminderSent: { $ne: true },
      });

      // Envia lembretes para cada reserva encontrada
      for (const reserve of reservesToRemind) {
        const restaurant = await this.readRestaurantService.findRestaurantById(
          reserve.restaurantId.toString(),
        );

        if (process.env.NODE_ENV === 'production') {
          const reminderTemplate = ReservationReminderEmailTemplate({
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
            restaurantAddress: `${restaurant.address.street}, ${restaurant.address.number} - ${restaurant.address.district} - ${restaurant.address.city} - ${restaurant.address.state}`,
            restaurantPhone: restaurant.phone,
            cancelReserveLink:
              process.env.NODE_ENV === 'production'
                ? `https://reservas-back-fuor.onrender.com/api/reserve/cancel/client/${reserve._id}`
                : `http://localhost:3500/api/reserve/cancel/client/${reserve._id}`,
          });

          await this.mailerService.sendEmail(
            reserve.email,
            'Lembrete: Sua reserva é em 30 minutos!',
            reminderTemplate,
          );
        } else {
          console.log('Lembrete não enviado para reserva', reserve._id);
        }

        // Marca o lembrete como enviado
        await this.reserveModel.findByIdAndUpdate(reserve._id, {
          reminderSent: true,
        });

        this.logger.log(`Lembrete enviado para reserva ${reserve._id}`);
      }
    } catch (error) {
      this.logger.error('Erro ao processar lembretes:', error);
    }
  }
}
