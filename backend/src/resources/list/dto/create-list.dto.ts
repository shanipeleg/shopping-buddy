import { IsNotEmpty, Validate } from 'class-validator';
// import { CheckFolderExists } from 'src/validations/check-folder-exists.validation';
export class CreateListDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  // @Validate(CheckFolderExists)
  folderId: number;

  typeId: number;
}
