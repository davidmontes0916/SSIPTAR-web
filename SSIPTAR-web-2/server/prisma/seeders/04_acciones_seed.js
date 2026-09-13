const { prisma } = require('../../src/config/prisma');

async function seedAcciones() {
  const accionesData = [
    { nombre: 'Create',  nombre_visible: 'Crear',      descripcion: 'Permite crear nuevos registros' },
    { nombre: 'Read',    nombre_visible: 'Leer',       descripcion: 'Permite consultar o visualizar registros' },
    { nombre: 'Update',  nombre_visible: 'Actualizar', descripcion: 'Permite modificar registros existentes' },
    { nombre: 'Delete',  nombre_visible: 'Eliminar',   descripcion: 'Permite eliminar registros' },
    { nombre: 'Approve', nombre_visible: 'Aprobar',    descripcion: 'Permite autorizar o aprobar registros' },
    { nombre: 'Import',  nombre_visible: 'Importar',   descripcion: 'Permite importar datos al sistema' },
    { nombre: 'Export',  nombre_visible: 'Exportar',   descripcion: 'Permite exportar datos del sistema' },
    { nombre: 'Generate',nombre_visible: 'Generar',    descripcion: 'Permite generar reportes o documentos' }
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