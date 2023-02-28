import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaModule } from 'src/core/prisma.module';
import { ValidationsModule } from 'src/core/validations/validations.module';

@Module({
  controllers: [ItemController],
  providers: [ItemService, PrismaModule, ValidationsModule],
})
export class ItemModule {}
