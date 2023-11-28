/*
  Warnings:

  - Added the required column `back_content` to the `FlashCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `front_content` to the `FlashCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FlashCard` ADD COLUMN `back_content` VARCHAR(191) NOT NULL,
    ADD COLUMN `front_content` VARCHAR(191) NOT NULL;
