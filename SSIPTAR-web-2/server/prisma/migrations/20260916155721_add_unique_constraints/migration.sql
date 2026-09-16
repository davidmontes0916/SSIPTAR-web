/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `acciones` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `modulos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `recursos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `acciones_nombre_key` ON `acciones`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `modulos_nombre_key` ON `modulos`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `recursos_nombre_key` ON `recursos`(`nombre`);

-- CreateIndex
CREATE UNIQUE INDEX `roles_nombre_key` ON `roles`(`nombre`);
