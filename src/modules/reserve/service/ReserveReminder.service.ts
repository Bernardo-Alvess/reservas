import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserve } from '../reserve.schema';
import { MailerService } from '../../mailer/mailer.service';
import { formatInTimeZone } from 'date-fns-tz';
import { ReservationReminderEmailTemplate } from 'src/modules/mailer/mailer.templates';
import { ReadRestaurantService } from 'src/modules/restaurant/services/ReadRestaurant.service';

@Injectable()
export class ReserveReminderService {
  private readonly logger = new Logger(ReserveReminderService.name);

  constructor(
    @InjectModel(Reserve.name) private readonly reserveModel: Model<Reserve>,
    private readonly mailerService: MailerService,
    private readonly readRestaurantService: ReadRestaurantService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleReminderCron() {
    try {
      // Calcula o intervalo de tempo para buscar reservas (30 minutos no futuro)
      console.log('Buscando reservas para lembrete');
      const now = new Date();
      const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60000);
      console.log(now, thirtyMinutesFromNow);
      // Busca reservas que começam em 30 minutos e ainda não receberam lembrete
      const reservesToRemind = await this.reserveModel.find({
        startTime: {
          $gt: now,
          $lte: thirtyMinutesFromNow,
        },
        // status: 'Confirmada',
        reminderSent: { $ne: true },
      });

      console.log(reservesToRemind);

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
            cancelReserveLink: `http://localhost:3500/api/reserve/cancel/client/${reserve._id}`,
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

  private async sendReminder(reserve: any) {
    const formattedTime = formatInTimeZone(
      reserve.startTime,
      'America/Sao_Paulo',
      'HH:mm',
    );

    const emailText = `
      Olá ${reserve.name}!

      Este é um lembrete da sua reserva hoje às ${formattedTime}.
      
      Detalhes da reserva:
      - Restaurante: ${reserve.restaurantId.name}
      - Mesa: ${reserve.tableNumber}
      - Número de pessoas: ${reserve.amountOfPeople}

      Por favor, chegue alguns minutos antes do horário marcado.
      
      Atenciosamente,
      Equipe do ${reserve.restaurantId.name}
    `;

    await this.mailerService.sendEmail(
      reserve.email,
      'Lembrete: Sua reserva é em 30 minutos!',
      emailText,
    );
  }
}
