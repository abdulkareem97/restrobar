/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Bottle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceNo` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchase` ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `invoiceNo` VARCHAR(191) NOT NULL,
    ADD COLUMN `total` JSON NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bottle_productId_key` ON `Bottle`(`productId`);
