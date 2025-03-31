/*
  Warnings:

  - You are about to drop the column `numroRegistro` on the `alugueis` table. All the data in the column will be lost.
  - Added the required column `numeroRegistro` to the `Alugueis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alugueis` DROP COLUMN `numroRegistro`,
    ADD COLUMN `numeroRegistro` VARCHAR(191) NOT NULL;
