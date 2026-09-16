const { prisma } = require('../../src/config/prisma');

async function main() {
  const rolAdmin = await prisma.rol.findUnique({ where: { nombre: 'Administrador' } });
  if (!rolAdmin) throw new Error('Falta rol Administrador. Corre 05_roles_seed.js primero.');

  const permisos = await prisma.permiso.findMany();
  if (permisos.length === 0) {
    throw new Error('No hay permisos. Corre 04_permisos_seed.js primero.');
  }

  let insertados = 0;
  for (const permiso of permisos) {
    await prisma.rolPermiso.create({
      data: {
        id_rol: rolAdmin.id_rol,
        id_permiso: permiso.id_permiso
      }
    });
    insertados++;
  }

  console.log(`Seeder de RolPermiso ejecutado correctamente ✅ (${insertados} asociaciones insertadas)`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });