import { HttpException, HttpStatus } from '@nestjs/common';

export class MailerExceptions {
  static FailedSendRecoveryMessage() {
    throw new HttpException(
      'Ошибка отправки письма на восстановление пароля',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
