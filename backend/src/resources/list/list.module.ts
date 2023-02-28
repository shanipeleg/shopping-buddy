import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { ValidationsModule } from 'src/core/validations/validations.module';
import { PrismaModule } from 'src/core/prisma.module';

@Module({
  controllers: [ListController],
  providers: [ListService, PrismaModule, ValidationsModule],
})
export class ListModule {}
