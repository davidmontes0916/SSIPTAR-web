-- CreateTable
CREATE TABLE `riesgos` (
    `id_riesgo` INTEGER NOT NULL AUTO_INCREMENT,
    `anio` INTEGER NOT NULL,
    `numero` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `solucion` VARCHAR(191) NULL,

    PRIMARY KEY (`id_riesgo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
