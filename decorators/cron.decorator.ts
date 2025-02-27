import * as parser from 'cron-parser';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsCron(options?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    const validator: ValidatorConstraintInterface = {
      errorMessage: 'invalid cron pattern',

      validate(value: string) {
        try {
          parser.parseExpression(value);
          return true;
        } catch {
          return false;
        }
      },

      defaultMessage() {
        return this.errorMessage;
      },
    };

    registerDecorator({
      name: 'isCron',
      options,
      validator,
      propertyName,
      target: object.constructor,
    });
  };
}
