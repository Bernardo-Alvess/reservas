import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailerService {
  constructor(private readonly resend: Resend) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      const { error } = await this.resend.emails.send({
        from: 'ReservaFacil <reserva@reserva-facil.xyz>',
        to: to,
        subject: subject,
        html: text,
      });

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw error;
    }
  }
}
