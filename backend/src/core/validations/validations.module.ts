import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma.module';
import { PrismaService } from 'src/core/prisma.service';
import { CheckFolderExists } from './check-folder-exists.validation';

@Module({
  imports: [PrismaModule],
  providers: [CheckFolderExists, PrismaService],
  exports: [CheckFolderExists],
})
export class ValidationsModule {}
