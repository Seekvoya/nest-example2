import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import envConfig from '@/config/envConfig';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Injectable()
export default class MailConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        secure: false,
        ignoreTLS: true,
        port: envConfig.mailer.port,
        host: envConfig.mailer.server,
        auth: {
          user: envConfig.mailer.user,
          pass: envConfig.mailer.password,
        },
      },
      defaults: {
        from: `"${envConfig.mailer.from}" <${envConfig.mailer.user}>`,
      },
      template: {
        adapter: new EjsAdapter(),
        options: { strict: false },
      },
    };
  }
}
