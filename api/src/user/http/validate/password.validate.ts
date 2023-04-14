import { ValidationOptions } from './../../../../node_modules/class-validator/types/decorator/ValidationOptions.d';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: true })
class PasswordValidator implements ValidatorConstraintInterface {
  async validate(value: string) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    console.log(value);
    return regex.test(value);
  }
}

export function Password(
  customs?: any[],
  validationOptions?: ValidationOptions,
) {
  validationOptions =
    validationOptions || ({ message: 'The $property is invalid.' } as any);
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordValidator,
    });
  };
}
