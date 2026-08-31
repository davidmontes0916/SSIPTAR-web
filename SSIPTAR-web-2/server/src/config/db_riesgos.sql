-- 1. Módulo Matriz de seguimiento
use SSIPTAR;
INSERT INTO modulos (nombre, descripcion, ruta, icono, orden)
VALUES ('Matriz de seguimiento', 'Gestión de riesgos y acciones de control', '/matriz', 'table', 2);

-- Supongamos que el id_modulo generado es 2

-- 2. Recurso Riesgos
INSERT INTO recursos (nombre, descripcion)
VALUES ('Riesgos', 'Gestión de riesgos identificados en la matriz');

-- Supongamos que el id_recurso generado es 2

-- 3. Permisos para Riesgos (usando las acciones ya existentes)
INSERT INTO permisos (nombre, id_modulo, id_recurso, id_accion)
VALUES
('Riesgos - Crear', 2, 2, 1),
('Riesgos - Consultar', 2, 2, 2),
('Riesgos - Editar', 2, 2, 3),
('Riesgos - Eliminar', 2, 2, 4),
('Riesgos - Listar', 2, 2, 5);

-- Supongamos que los id_permiso generados son 6 a 10

-- 4. Asignar permisos al rol Administrador (id_rol = 1)
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 6);
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 7);
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 8);
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 9);
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 10);