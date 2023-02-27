import { IsNotEmpty } from 'class-validator';
// import { CheckFolderExists } from 'src/validations/check-folder-exists.validation';
export class CreateListDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  folderId: number;

  typeId: number;
}
