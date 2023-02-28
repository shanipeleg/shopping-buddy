import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma.module';
import { PrismaService } from 'src/core/prisma.service';
import { CheckCategoryExistConstraint } from './check-category-exists.validation';
import { CheckFolderExistConstraint } from './check-folder-exists.validation';
import { CheckListExistConstraint } from './check-list-exists.validation';
import { CheckTypeExistConstraint } from './check-type-exists.validation';

@Module({
  imports: [PrismaModule],
  providers: [
    CheckCategoryExistConstraint,
    CheckTypeExistConstraint,
    CheckFolderExistConstraint,
    CheckListExistConstraint,
    PrismaService,
  ],
  exports: [
    CheckListExistConstraint,
    CheckFolderExistConstraint,
    CheckTypeExistConstraint,
    CheckCategoryExistConstraint,
  ],
})
export class ValidationsModule {}
