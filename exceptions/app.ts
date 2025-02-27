import { HttpException, HttpStatus } from '@nestjs/common';

export class AppExceptions {
  static NoReleaseInfo() {
    throw new HttpException('Отсутствует информация о релизе', HttpStatus.NOT_FOUND);
  }

  static InternalError() {
    throw new HttpException('Ошибка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
export class EntitiesExceptions {
  static NotFound() {
    throw new HttpException('Не найдено', HttpStatus.NOT_FOUND);
  }
}
