/*
  Warnings:

  - You are about to drop the `alugueis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `alugueis` DROP FOREIGN KEY `Alugueis_automovelId_fkey`;

-- DropForeignKey
ALTER TABLE `alugueis` DROP FOREIGN KEY `Alugueis_contratanteId_fkey`;

-- DropTable
DROP TABLE `alugueis`;

-- CreateTable
CREATE TABLE `Aluguel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataInicio` DATETIME(3) NOT NULL,
    `dataFim` DATETIME(3) NOT NULL,
    `numeroRegistro` VARCHAR(191) NOT NULL,
    `automovelId` INTEGER NOT NULL,
    `contratanteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aluguel` ADD CONSTRAINT `Aluguel_automovelId_fkey` FOREIGN KEY (`automovelId`) REFERENCES `Automovel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluguel` ADD CONSTRAINT `Aluguel_contratanteId_fkey` FOREIGN KEY (`contratanteId`) REFERENCES `Contratante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
