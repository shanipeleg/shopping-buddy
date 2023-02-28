import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from '../prisma.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class CheckTypeExistConstraint implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(id: number) {
    if (!id) return true;
    return Boolean(
      await this.prismaService.type.findFirst({
        where: { id },
      }),
    );
  }

  defaultMessage() {
    return 'Type not found.';
  }
}

export function CheckTypeExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'checkTypeExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckTypeExistConstraint,
    });
  };
}
