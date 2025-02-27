import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigService from '@/config/ormconfig';

import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { CheckModule } from '@/modules/check/check.module';
import { CronModule } from '@/modules/scheduler/cron.module';
import { ReminderModule } from '@/modules/reminder/reminder.module';
import { MailerModule } from '@nestjs-modules/mailer';
import MailConfigService from '@/config/mailConfig';
import { FeedbackModule } from '@/modules/feedback/feedback.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),

    JwtModule,
    AuthModule,
    CronModule,
    UsersModule,
    CheckModule,
    ReminderModule,
    FeedbackModule,
  ],
})
export class AppModule {}
