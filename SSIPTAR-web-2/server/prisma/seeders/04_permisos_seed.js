const { prisma } = require('../../src/config/prisma');

async function main() {
  // Catálogos base
  const moduloAdmin = await prisma.modulo.findUnique({ where: { nombre: 'Dashboard administrativo' } });
  const moduloMatriz = await prisma.modulo.findUnique({ where: { nombre: 'Matriz de seguimiento' } });
  const recursoUsuarios = await prisma.recurso.findUnique({ where: { nombre: 'Usuarios' } });
  const recursoRiesgos = await prisma.recurso.findUnique({ where: { nombre: 'Riesgos' } });

  if (!moduloAdmin || !moduloMatriz || !recursoUsuarios || !recursoRiesgos) {
    throw new Error('Faltan catálogos. Corre 01_modulos y 02_recursos primero.');
  }

  // Buscar acciones por nombre exacto (en minúscula, como en 03_acciones_seed.js)
  const acciones = await prisma.accion.findMany();
  const accionPorNombre = Object.fromEntries(acciones.map(a => [a.nombre, a]));

  const requeridas = ['create', 'read', 'update', 'delete', 'list'];
  for (const nombre of requeridas) {
    if (!accionPorNombre[nombre]) {
      throw new Error(`Falta la acción "${nombre}". Corre 03_acciones_seed.js primero.`);
    }
  }

  // Permisos de Usuarios
  for (const nombre of requeridas) {
    const accion = accionPorNombre[nombre];
    await prisma.permiso.create({
      data: {
        nombre: `Usuarios - ${accion.nombre_visible}`,
        id_modulo: moduloAdmin.id_modulo,
        id_recurso: recursoUsuarios.id_recurso,
        id_accion: accion.id_accion
      }
    });
  }

  // Permisos de Riesgos
  for (const nombre of requeridas) {
    const accion = accionPorNombre[nombre];
    await prisma.permiso.create({
      data: {
        nombre: `Riesgos - ${accion.nombre_visible}`,
        id_modulo: moduloMatriz.id_modulo,
        id_recurso: recursoRiesgos.id_recurso,
        id_accion: accion.id_accion
      }
    });
  }

  console.log('Seeder de Permisos ejecutado correctamente ✅ (10 permisos insertados)');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });