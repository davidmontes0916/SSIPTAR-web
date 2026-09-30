-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido_paterno` VARCHAR(100) NOT NULL,
    `apellido_materno` VARCHAR(100) NULL,
    `correo` VARCHAR(150) NOT NULL,
    `contrasena` VARCHAR(255) NOT NULL,
    `telefono_1` VARCHAR(20) NULL,
    `telefono_2` VARCHAR(20) NULL,
    `estado` ENUM('Pendiente', 'Activo', 'Inactivo', 'Eliminado') NOT NULL DEFAULT 'Pendiente',
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_unidad_administrativa` INTEGER NULL,

    UNIQUE INDEX `usuarios_correo_key`(`correo`),
    INDEX `usuarios_id_unidad_administrativa_idx`(`id_unidad_administrativa`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',

    UNIQUE INDEX `roles_nombre_key`(`nombre`),
    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_rol` (
    `id_usuario` INTEGER NOT NULL,
    `id_rol` INTEGER NOT NULL,

    INDEX `usuario_rol_id_rol_idx`(`id_rol`),
    PRIMARY KEY (`id_usuario`, `id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acciones` (
    `id_accion` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `nombre_visible` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,

    PRIMARY KEY (`id_accion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modulos` (
    `id_modulo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(150) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `ruta` VARCHAR(191) NULL,
    `icono` VARCHAR(191) NULL,

    PRIMARY KEY (`id_modulo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recursos` (
    `id_recurso` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`id_recurso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permisos` (
    `id_permiso` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `id_modulo` INTEGER NOT NULL,
    `id_recurso` INTEGER NOT NULL,
    `id_accion` INTEGER NOT NULL,

    UNIQUE INDEX `permisos_nombre_key`(`nombre`),
    INDEX `permisos_id_modulo_idx`(`id_modulo`),
    INDEX `permisos_id_recurso_idx`(`id_recurso`),
    INDEX `permisos_id_accion_idx`(`id_accion`),
    PRIMARY KEY (`id_permiso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol_permiso` (
    `id_rol` INTEGER NOT NULL,
    `id_permiso` INTEGER NOT NULL,

    INDEX `rol_permiso_id_permiso_idx`(`id_permiso`),
    PRIMARY KEY (`id_rol`, `id_permiso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidades_administrativas` (
    `id_unidad_administrativa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `unidades_administrativas_nombre_key`(`nombre`),
    PRIMARY KEY (`id_unidad_administrativa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificaciones` (
    `id_notificacion` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('CUENTA', 'AVISO', 'EVIDENCIA') NOT NULL,
    `mensaje` TEXT NOT NULL,
    `fecha_envio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('PENDIENTE', 'LEIDA') NOT NULL DEFAULT 'PENDIENTE',
    `id_usuario_destinatario` INTEGER NOT NULL,
    `id_usuario_origen` INTEGER NULL,

    INDEX `notificaciones_id_usuario_destinatario_idx`(`id_usuario_destinatario`),
    INDEX `notificaciones_id_usuario_origen_idx`(`id_usuario_origen`),
    PRIMARY KEY (`id_notificacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens_verificacion` (
    `id_token` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(10) NOT NULL,
    `expira_en` DATETIME(3) NOT NULL,
    `usado` BOOLEAN NOT NULL DEFAULT false,
    `id_usuario` INTEGER NOT NULL,

    INDEX `tokens_verificacion_id_usuario_idx`(`id_usuario`),
    PRIMARY KEY (`id_token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `archivos` (
    `id_archivo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(200) NOT NULL,
    `formato` ENUM('PDF', 'JPEG', 'XLSX') NOT NULL,
    `tipo` ENUM('MATRIZ_RIESGOS', 'PTAR', 'MAPA_RIESGOS') NOT NULL,
    `ruta` VARCHAR(255) NOT NULL,
    `fecha_subida` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_usuario` INTEGER NOT NULL,

    INDEX `archivos_id_usuario_idx`(`id_usuario`),
    PRIMARY KEY (`id_archivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riesgos` (
    `id_riesgo` INTEGER NOT NULL AUTO_INCREMENT,
    `anio` INTEGER NOT NULL,
    `numero` INTEGER NOT NULL,
    `descripcion` TEXT NOT NULL,
    `solucion` TEXT NULL,

    PRIMARY KEY (`id_riesgo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acciones_control` (
    `id_accion` INTEGER NOT NULL AUTO_INCREMENT,
    `id_riesgo` INTEGER NOT NULL,
    `numero` INTEGER NOT NULL,
    `descripcion` TEXT NOT NULL,
    `medios_verificacion` TEXT NULL,
    `id_unidad_administrativa` INTEGER NOT NULL,
    `id_responsable` INTEGER NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_termino` DATETIME(3) NOT NULL,
    `porcentaje_acumulado` DOUBLE NOT NULL DEFAULT 0,
    `cumplida` BOOLEAN NOT NULL DEFAULT false,

    INDEX `acciones_control_id_riesgo_idx`(`id_riesgo`),
    INDEX `acciones_control_id_unidad_administrativa_idx`(`id_unidad_administrativa`),
    INDEX `acciones_control_id_responsable_idx`(`id_responsable`),
    PRIMARY KEY (`id_accion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reportes_trimestrales` (
    `id_reporte` INTEGER NOT NULL AUTO_INCREMENT,
    `id_accion` INTEGER NOT NULL,
    `trimestre` INTEGER NOT NULL,
    `porcentaje_avance_trimestral` DOUBLE NOT NULL DEFAULT 0,
    `observaciones` TEXT NULL,

    INDEX `reportes_trimestrales_id_accion_idx`(`id_accion`),
    PRIMARY KEY (`id_reporte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evidencias` (
    `id_evidencia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_reporte` INTEGER NOT NULL,
    `formato` ENUM('JPEG', 'PNG', 'PDF') NOT NULL,
    `ruta` VARCHAR(255) NOT NULL,
    `estado` ENUM('PENDIENTE', 'EN_REVISION', 'APROBADO', 'RECHAZADO') NOT NULL DEFAULT 'PENDIENTE',
    `id_usuario_reporta` INTEGER NOT NULL,
    `id_usuario_revisa` INTEGER NULL,
    `comentarios` TEXT NULL,

    INDEX `evidencias_id_reporte_idx`(`id_reporte`),
    INDEX `evidencias_id_usuario_reporta_idx`(`id_usuario_reporta`),
    INDEX `evidencias_id_usuario_revisa_idx`(`id_usuario_revisa`),
    PRIMARY KEY (`id_evidencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios` (
    `id_comentario` INTEGER NOT NULL AUTO_INCREMENT,
    `contenido` TEXT NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_usuario` INTEGER NOT NULL,
    `id_reporte` INTEGER NULL,
    `id_evidencia` INTEGER NULL,

    INDEX `comentarios_id_usuario_idx`(`id_usuario`),
    INDEX `comentarios_id_reporte_idx`(`id_reporte`),
    INDEX `comentarios_id_evidencia_idx`(`id_evidencia`),
    PRIMARY KEY (`id_comentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `informes` (
    `id_informe` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,

    INDEX `informes_id_usuario_idx`(`id_usuario`),
    PRIMARY KEY (`id_informe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responsables` (
    `id_responsable` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `responsables_nombre_key`(`nombre`),
    PRIMARY KEY (`id_responsable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_id_unidad_administrativa_fkey` FOREIGN KEY (`id_unidad_administrativa`) REFERENCES `unidades_administrativas`(`id_unidad_administrativa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_rol` ADD CONSTRAINT `usuario_rol_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_rol` ADD CONSTRAINT `usuario_rol_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permisos` ADD CONSTRAINT `permisos_id_modulo_fkey` FOREIGN KEY (`id_modulo`) REFERENCES `modulos`(`id_modulo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permisos` ADD CONSTRAINT `permisos_id_recurso_fkey` FOREIGN KEY (`id_recurso`) REFERENCES `recursos`(`id_recurso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permisos` ADD CONSTRAINT `permisos_id_accion_fkey` FOREIGN KEY (`id_accion`) REFERENCES `acciones`(`id_accion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rol_permiso` ADD CONSTRAINT `rol_permiso_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rol_permiso` ADD CONSTRAINT `rol_permiso_id_permiso_fkey` FOREIGN KEY (`id_permiso`) REFERENCES `permisos`(`id_permiso`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificaciones` ADD CONSTRAINT `notificaciones_id_usuario_destinatario_fkey` FOREIGN KEY (`id_usuario_destinatario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificaciones` ADD CONSTRAINT `notificaciones_id_usuario_origen_fkey` FOREIGN KEY (`id_usuario_origen`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens_verificacion` ADD CONSTRAINT `tokens_verificacion_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `archivos` ADD CONSTRAINT `archivos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acciones_control` ADD CONSTRAINT `acciones_control_id_riesgo_fkey` FOREIGN KEY (`id_riesgo`) REFERENCES `riesgos`(`id_riesgo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acciones_control` ADD CONSTRAINT `acciones_control_id_unidad_administrativa_fkey` FOREIGN KEY (`id_unidad_administrativa`) REFERENCES `unidades_administrativas`(`id_unidad_administrativa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acciones_control` ADD CONSTRAINT `acciones_control_id_responsable_fkey` FOREIGN KEY (`id_responsable`) REFERENCES `responsables`(`id_responsable`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reportes_trimestrales` ADD CONSTRAINT `reportes_trimestrales_id_accion_fkey` FOREIGN KEY (`id_accion`) REFERENCES `acciones_control`(`id_accion`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evidencias` ADD CONSTRAINT `evidencias_id_reporte_fkey` FOREIGN KEY (`id_reporte`) REFERENCES `reportes_trimestrales`(`id_reporte`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evidencias` ADD CONSTRAINT `evidencias_id_usuario_reporta_fkey` FOREIGN KEY (`id_usuario_reporta`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evidencias` ADD CONSTRAINT `evidencias_id_usuario_revisa_fkey` FOREIGN KEY (`id_usuario_revisa`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_id_reporte_fkey` FOREIGN KEY (`id_reporte`) REFERENCES `reportes_trimestrales`(`id_reporte`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_id_evidencia_fkey` FOREIGN KEY (`id_evidencia`) REFERENCES `evidencias`(`id_evidencia`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `informes` ADD CONSTRAINT `informes_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
