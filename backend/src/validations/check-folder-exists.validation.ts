import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@ValidatorConstraint({ name: 'FolderExists', async: true })
@Injectable()
export class CheckFolderExists implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(id: number) {
    // console.log(this)
    return await Boolean(this.prisma.folder.count({ where: { id } }));
  }

  defaultMessage() {
    return `Folder does not exist`;
  }
}
