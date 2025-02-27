import * as dayjs from 'dayjs';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
/* eslint-disable */
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
/* eslint-enable */

const MAX_YEAR = 2050;
const MIN_YEAR = 2010;

export function ValidateDataFormat(dataFormat: string, options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    const validations = {
      isFormatValid: {
        validator: (date: string) =>
          //Создание регулярного выражения для проверки формата даты
          new RegExp('^' + dataFormat.replace(/\w/g, '\\d') + '$').test(date),
        message: `Значение в «${propertyName}» должно быть в формате ${dataFormat}`,
      },
      isDateValid: {
        validator: (date: string) => {
          return dayjs(date, dataFormat, true).isValid();
        },
        message: `Значение в «${propertyName}» cодержит невалидную дату»`,
      },
      isMaxYearValid: {
        validator: (date: string) => dayjs(date, dataFormat).year() <= MAX_YEAR,
        message: `Год в строке «${propertyName}» не должен превышать ${MAX_YEAR}`,
      },
      isMinYearValid: {
        validator: (date: string) => dayjs(date, dataFormat).year() >= MIN_YEAR,
        message: `Год в строке «${propertyName}» не должен быть меньше чем ${MIN_YEAR}`,
      },
    };

    const validator: ValidatorConstraintInterface = {
      errorMessage: null,

      validate(date: string) {
        for (const validation of Object.values(validations)) {
          if (!validation.validator(date)) {
            this.errorMessage = validation.message;
            return false;
          }
        }
        return true;
      },

      defaultMessage() {
        return this.errorMessage;
      },
    };

    registerDecorator({
      options,
      validator,
      propertyName,
      target: object.constructor,
    });
  };
}
