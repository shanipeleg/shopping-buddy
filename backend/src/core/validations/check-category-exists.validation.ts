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
export class CheckCategoryExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prismaService: PrismaService) {}

  async validate(id: number) {
    if (!id) return true;
    return Boolean(
      await this.prismaService.category.findFirst({
        where: { id },
      }),
    );
  }

  defaultMessage() {
    return 'Category not found.';
  }
}

export function CheckCategoryExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'checkCategoryExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckCategoryExistConstraint,
    });
  };
}
