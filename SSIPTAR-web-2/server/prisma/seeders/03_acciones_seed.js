const { prisma } = require('../../src/config/prisma');

async function seedAcciones() {
  const accionesData = [
    { nombre: 'create', nombre_visible: 'Crear',     descripcion: 'Crear registros' },
    { nombre: 'read',   nombre_visible: 'Consultar', descripcion: 'Consultar registros individuales' },
    { nombre: 'update', nombre_visible: 'Editar',    descripcion: 'Actualizar registros' },
    { nombre: 'delete', nombre_visible: 'Eliminar',  descripcion: 'Eliminar registros' },
    { nombre: 'list',   nombre_visible: 'Listar',    descripcion: 'Listar todos los registros' }
  ];

  const acciones = [];
  for (const accion of accionesData) {
    const a = await prisma.accion.create({ data: accion });
    acciones.push(a);
  }
  return acciones;
}

async function main() {
  const acciones = await seedAcciones();
  console.log(`Seeder de Acciones ejecutado correctamente ✅ (${acciones.length} acciones insertadas)`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });