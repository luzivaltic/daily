-- DropForeignKey
ALTER TABLE `Block` DROP FOREIGN KEY `Block_back_flashcard_id_fkey`;

-- DropForeignKey
ALTER TABLE `Block` DROP FOREIGN KEY `Block_content_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `Block` DROP FOREIGN KEY `Block_front_flashcard_id_fkey`;

-- DropForeignKey
ALTER TABLE `Chapter` DROP FOREIGN KEY `Chapter_subject_id_fkey`;

-- DropForeignKey
ALTER TABLE `FlashCard` DROP FOREIGN KEY `FlashCard_chapter_id_fkey`;

-- DropForeignKey
ALTER TABLE `Learning` DROP FOREIGN KEY `Learning_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Subject` DROP FOREIGN KEY `Subject_learning_id_fkey`;

-- AddForeignKey
ALTER TABLE `Learning` ADD CONSTRAINT `Learning_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_learning_id_fkey` FOREIGN KEY (`learning_id`) REFERENCES `Learning`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FlashCard` ADD CONSTRAINT `FlashCard_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `Chapter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Block` ADD CONSTRAINT `Block_content_type_id_fkey` FOREIGN KEY (`content_type_id`) REFERENCES `ContentType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Block` ADD CONSTRAINT `Block_front_flashcard_id_fkey` FOREIGN KEY (`front_flashcard_id`) REFERENCES `FlashCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Block` ADD CONSTRAINT `Block_back_flashcard_id_fkey` FOREIGN KEY (`back_flashcard_id`) REFERENCES `FlashCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
