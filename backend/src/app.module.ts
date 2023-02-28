import { Module } from '@nestjs/common';
import { ValidationsModule } from './core/validations/validations.module';
import { CategoryModule } from './resources/category/category.module';
import { FolderModule } from './resources/folder/folder.module';
import { ItemModule } from './resources/item/item.module';
import { ListModule } from './resources/list/list.module';
import { TypeModule } from './resources/type/type.module';

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
