/*
  Warnings:

  - A unique constraint covering the columns `[numeroRegistro]` on the table `Aluguel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Aluguel_numeroRegistro_key` ON `Aluguel`(`numeroRegistro`);
