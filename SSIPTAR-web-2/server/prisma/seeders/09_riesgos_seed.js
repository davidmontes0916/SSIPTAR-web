const { prisma } = require('../../src/config/prisma');

async function seedRecursoRiesgos() {
  return await prisma.recurso.findUnique({
    where: { nombre: 'Riesgos' }
  });
}

async function seedPermisosRiesgos(recursoRiesgos, acciones, rolAdmin, moduloMatriz) {
  const permisos = [];
  for (const accion of acciones) {
    const permiso = await prisma.permiso.create({
      data: {
        nombre: `Riesgos - ${accion.nombre_visible}`,
        id_modulo: moduloMatriz.id_modulo,
        id_recurso: recursoRiesgos.id_recurso,
        id_accion: accion.id_accion
      }
    });
    permisos.push(permiso);

    // Asignar al rol Administrador
    await prisma.rolPermiso.create({
      data: {
        id_rol: rolAdmin.id_rol,
        id_permiso: permiso.id_permiso
      }
    });
  }
  return permisos;
}

async function main() {
  // Buscar rol Administrador ya creado
  const rolAdmin = await prisma.rol.findFirst({
    where: { nombre: 'Administrador' }
  });
  if (!rolAdmin) throw new Error('Rol Administrador no existe, ejecuta primero el seeder RBAC');

  // Buscar módulo Matriz de seguimiento ya creado
  const moduloMatriz = await prisma.modulo.findFirst({
    where: { nombre: 'Matriz de seguimiento' }
  });
  if (!moduloMatriz) throw new Error('Módulo Matriz de seguimiento no existe, ejecuta primero el seeder RBAC');

  // Buscar acciones ya creadas
  const acciones = await prisma.accion.findMany();
  if (acciones.length === 0) throw new Error('No existen acciones, ejecuta primero el seeder de acciones');

  // Crear recurso Riesgos
  const recursoRiesgos = await seedRecursoRiesgos();

  // Crear permisos y asignarlos al rol Administrador
  await seedPermisosRiesgos(recursoRiesgos, acciones, rolAdmin, moduloMatriz);

  console.log('Seeder de Riesgos ejecutado correctamente ✅');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
