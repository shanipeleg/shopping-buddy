import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { CheckFolderExists } from './check-folder-exists.validation';

@Module({
  imports: [PrismaModule],
  providers: [CheckFolderExists],
  exports: [CheckFolderExists],
})
export class ValidationsModule {}
