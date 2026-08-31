const { prisma } = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser({ nombre, apellido_paterno, apellido_materno, correo, contrasena }) {
  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(contrasena, 10);

  // Crear usuario
  const user = await prisma.usuario.create({
    data: {
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      contrasena: hashedPassword,
      estado: 'Activo'
    }
  });

  return user;
}

async function loginUser(correo, contrasena) {
  const user = await prisma.usuario.findUnique({
    where: { correo },
    include: {
      usuario_roles: {
        include: {
          rol: {
            include: {
              rol_permisos: {
                include: {
                  permiso: { include: { modulo: true, accion: true } }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!user) throw new Error('Usuario no encontrado');

  const validPassword = await bcrypt.compare(contrasena, user.contrasena);
  if (!validPassword) throw new Error('Contraseña incorrecta');

  // Extraer permisos
  const permissions = user.usuario_roles.flatMap(ur =>
    ur.rol.rol_permisos.map(rp => ({
      permiso: rp.permiso.nombre,
      modulo: rp.permiso.modulo.nombre,
      accion: rp.permiso.accion.nombre
    }))
  );

  const token = jwt.sign(
    { id_usuario: user.id_usuario, correo: user.correo, permissions },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user };
}

module.exports = { registerUser, loginUser };
