const { prisma } = require('../config/prisma');
const bcrypt = require('bcryptjs');

// Crear usuario
async function createUsuario(data) {
  const hashedPassword = await bcrypt.hash(data.contrasena, 10);
  return prisma.usuario.create({
    data: { ...data, contrasena: hashedPassword, estado: 'Activo' }
  });
}

// Listar usuarios con campos específicos
async function listUsuarios() {
  return prisma.usuario.findMany({
    select: {
      nombre: true,
      apellido_paterno: true,
      apellido_materno: true,
      correo: true,
      estado: true,
      usuario_roles: {
        select: {
          rol: {
            select: {
              nombre: true
            }
          }
        }
      }
    }
  });
}

// Consultar usuario por ID
async function getUsuarioById(id_usuario) {
  return prisma.usuario.findUnique({ where: { id_usuario } });
}

// Editar usuario
async function updateUsuario(id_usuario, data) {
  if (data.contrasena) {
    data.contrasena = await bcrypt.hash(data.contrasena, 10);
  }
  return prisma.usuario.update({
    where: { id_usuario },
    data
  });
}

// Eliminar usuario
async function deleteUsuario(id_usuario) {
  return prisma.usuario.delete({ where: { id_usuario } });
}

module.exports = {
  createUsuario,
  listUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};
