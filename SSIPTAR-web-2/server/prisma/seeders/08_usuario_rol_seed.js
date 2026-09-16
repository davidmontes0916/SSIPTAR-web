const { prisma } = require('../../src/config/prisma');

async function main() {
  const usuario = await prisma.usuario.findUnique({ where: { correo: 'admin@sistema.com' } });
  const rolAdmin = await prisma.rol.findUnique({ where: { nombre: 'Administrador' } });

  if (!usuario || !rolAdmin) {
    throw new Error('Falta usuario o rol. Corre 05_roles_seed.js y 07_usuarios_seed.js primero.');
  }

  await prisma.usuarioRol.create({
    data: {
      id_usuario: usuario.id_usuario,
      id_rol: rolAdmin.id_rol
    }
  });

  console.log('Seeder de UsuarioRol ejecutado correctamente ✅');
}              
main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });