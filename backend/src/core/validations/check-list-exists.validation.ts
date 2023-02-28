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
export class CheckListExistConstraint implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(id: number) {
    if (!id) return true;
    return Boolean(
      await this.prismaService.list.findFirst({
        where: { id },
      }),
    );
  }

  defaultMessage() {
    return 'List not found.';
  }
}

export function CheckListExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'checkListExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckListExistConstraint,
    });
  };
}
