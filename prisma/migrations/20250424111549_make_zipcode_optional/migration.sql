/*
  Warnings:

  - Made the column `addressLine1` on table `vendor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `vendor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `vendor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vendor` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `addressLine1` VARCHAR(191) NOT NULL,
    MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `country` VARCHAR(191) NOT NULL;
