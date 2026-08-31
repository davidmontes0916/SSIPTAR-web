// src/middleware/permission.middleware.js
const { prisma } = require('../config/prisma');

function checkPermission(resourceId, actionId) {
  return async (req, res, next) => {
    try {
      const userId = req.user.id_usuario;

      if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
      }

      // Buscar roles del usuario con sus permisos
      const roles = await prisma.usuarioRol.findMany({
        where: { id_usuario: userId },
        include: {
          rol: {
            include: {
              rol_permisos: {
                include: {
                  permiso: {
                    include: { recurso: true, accion: true }
                  }
                }
              }
            }
          }
        }
      });

      // Validar si alguno de sus roles tiene el permiso requerido
      const hasPermission = roles.some(r =>
        r.rol.rol_permisos.some(rp =>
          rp.permiso.id_recurso === resourceId &&
          rp.permiso.id_accion === actionId
        )
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'Acceso denegado' });
      }

      next();
    } catch (error) {
      console.error('Error en autorización:', error);
      res.status(500).json({ error: 'Error en autorización' });
    }
  };
}

module.exports = { checkPermission };
