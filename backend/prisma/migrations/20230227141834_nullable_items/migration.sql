-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `List_folderId_fkey`;

-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `List_typeId_fkey`;

-- AlterTable
ALTER TABLE `list` MODIFY `folderId` INTEGER NULL,
    MODIFY `typeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `Folder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
