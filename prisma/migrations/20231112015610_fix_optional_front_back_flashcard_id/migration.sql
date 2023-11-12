-- DropForeignKey
ALTER TABLE `Block` DROP FOREIGN KEY `Block_back_flashcard_id_fkey`;

-- DropForeignKey
ALTER TABLE `Block` DROP FOREIGN KEY `Block_front_flashcard_id_fkey`;

-- AlterTable
ALTER TABLE `Block` MODIFY `front_flashcard_id` VARCHAR(191) NULL,
    MODIFY `back_flashcard_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Block` ADD CONSTRAINT `Block_front_flashcard_id_fkey` FOREIGN KEY (`front_flashcard_id`) REFERENCES `FlashCard`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Block` ADD CONSTRAINT `Block_back_flashcard_id_fkey` FOREIGN KEY (`back_flashcard_id`) REFERENCES `FlashCard`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
