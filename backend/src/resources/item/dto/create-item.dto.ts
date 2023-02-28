import { IsNotEmpty, isNumber } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  // @Validate(CheckFolderExists)
  @IsNotEmpty()
  listId: number;

  categoryId: number;

  @IsNotEmpty()
  quantity: number;
}
