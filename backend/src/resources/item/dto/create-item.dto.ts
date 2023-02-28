import { IsNotEmpty } from 'class-validator';
import { CheckListExists } from 'src/core/validations/check-list-exists.validation';

export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @CheckListExists()
  @IsNotEmpty()
  listId: number;

  categoryId: number;

  @IsNotEmpty()
  quantity: number;
}
