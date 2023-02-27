import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { FolderModule } from './folder/folder.module';
import { ItemModule } from './item/item.module';
import { ListModule } from './list/list.module';
import { TypeModule } from './type/type.module';
import { ValidationsModule } from './validations/validations.module';

@Module({
  imports: [
    ListModule,
    ValidationsModule,
    FolderModule,
    ItemModule,
    CategoryModule,
    TypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
