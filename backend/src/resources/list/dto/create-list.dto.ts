import { IsNotEmpty } from 'class-validator';
import { CheckFolderExists } from 'src/core/validations/check-folder-exists.validation';
import { CheckTypeExists } from 'src/core/validations/check-type-exists.validation';

export class CreateListDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @CheckFolderExists()
  folderId: number;

  @CheckTypeExists()
  typeId: number;
}
