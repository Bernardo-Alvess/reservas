import { Module } from '@nestjs/common';
import { Resend } from 'resend';
import { MailerService } from './mailer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MailerService, Resend],
  exports: [MailerService],
})
export class MailerModule {}
