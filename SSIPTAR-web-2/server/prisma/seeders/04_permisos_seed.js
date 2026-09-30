const { prisma } = require('../../src/config/prisma');

async function main() {
  // Catálogos base
  const moduloAdmin = await prisma.modulo.findFirst({ where: { nombre: 'Dashboard administrativo' } });
  const moduloMatriz = await prisma.modulo.findFirst({ where: { nombre: 'Matriz de seguimiento' } });
  const recursoUsuarios = await prisma.recurso.findFirst({ where: { nombre: 'Usuarios' } });
  const recursoRiesgos = await prisma.recurso.findFirst({ where: { nombre: 'Riesgos' } });
  const recursoResponsables = await prisma.recurso.findFirst({ where: { nombre: 'Responsables' } });
  const recursoInformes = await prisma.recurso.findFirst({ where: { nombre: 'Informes' } });

  if (!moduloAdmin || !moduloMatriz || !recursoUsuarios || !recursoRiesgos || !recursoResponsables || !recursoInformes) {
    throw new Error('Faltan catálogos. Corre 01_modulos y 02_recursos primero.');
  }

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

  // Permisos de Responsables
  for (const nombre of requeridas) {
    const accion = accionPorNombre[nombre];
    await prisma.permiso.create({
      data: {
        nombre: `Responsables - ${accion.nombre_visible}`,
        id_modulo: moduloAdmin.id_modulo,
        id_recurso: recursoResponsables.id_recurso,
        id_accion: accion.id_accion
      }
    });
  }

  // Permisos de Informes
  for (const nombre of requeridas) {
    const accion = accionPorNombre[nombre];
    await prisma.permiso.create({
      data: {
        nombre: `Informes - ${accion.nombre_visible}`,
        id_modulo: moduloAdmin.id_modulo,
        id_recurso: recursoInformes.id_recurso,
        id_accion: accion.id_accion
      }
    });
  }

  console.log('Seeder de Permisos ejecutado correctamente ✅ (20 permisos insertados)');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });