import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { PrismaService } from 'src/core/prisma.service';
import { ValidationsModule } from 'src/core/validations/validations.module';


@Module({
  controllers: [ListController],
  providers: [ListService, PrismaService, ValidationsModule],
})
export class ListModule {}
