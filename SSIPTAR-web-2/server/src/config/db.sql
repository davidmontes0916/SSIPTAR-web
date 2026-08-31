-- Active: 1780088966573@@127.0.0.1@3306@ssiptar
-- 1. Rol Administrador
INSERT INTO roles (nombre, descripcion, estado)
VALUES ('Administrador', 'Acceso completo al sistema', 'Activo');

-- 2. Módulo Dashboard administrativo
INSERT INTO modulos (nombre, descripcion, ruta, icono, orden)
VALUES ('Dashboard administrativo', 'Panel principal de administración', '/dashboard', 'dashboard', 1);

-- 3. Recurso Usuarios
INSERT INTO recursos (nombre, descripcion)
VALUES ('Usuarios', 'Gestión de usuarios del sistema');

-- 4. Acciones CRUD + Listar (si no existen ya)
INSERT INTO acciones (nombre, nombre_visible, descripcion)
VALUES 
('create', 'Crear', 'Crear registros'),
('read', 'Consultar', 'Consultar registros individuales'),
('update', 'Editar', 'Actualizar registros'),
('delete', 'Eliminar', 'Eliminar registros'),
('list', 'Listar', 'Listar todos los registros');

-- Supongamos que los IDs generados son:
-- 1=create, 2=read, 3=update, 4=delete, 5=list

-- 5. Permisos
INSERT INTO permisos (nombre, id_modulo, id_recurso, id_accion)
VALUES 
('Usuarios - Crear', 1, 1, 1),
('Usuarios - Consultar', 1, 1, 2),
('Usuarios - Editar', 1, 1, 3),
('Usuarios - Eliminar', 1, 1, 4),
('Usuarios - Listar', 1, 1, 5);

-- 6. Asignar permisos al rol Administrador
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 1);
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 2);
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 3);
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 4);
INSERT INTO rol_permiso (id_rol, id_permiso) VALUES (1, 5);

-- 7. Vincular usuario con rol Administrador
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (1, 1);
