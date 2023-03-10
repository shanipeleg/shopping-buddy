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
export class CheckFolderExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prismaService: PrismaService) {}

  async validate(id: number) {
    if (!id) return true;
    return Boolean(
      await this.prismaService.folder.findFirst({
        where: { id },
      }),
    );
  }

  defaultMessage() {
    return 'Folder not found.';
  }
}

export function CheckFolderExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'checkFolderExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckFolderExistConstraint,
    });
  };
}
