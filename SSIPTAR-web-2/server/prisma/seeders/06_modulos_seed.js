const { prisma } = require('../../src/config/prisma');

async function seedModulos() {
  const modulosData = [
    { nombre: 'Matriz de seguimiento', descripcion: 'Módulo de Matriz de seguimiento' },
    { nombre: 'Mapa de riesgos', descripcion: 'Módulo de Mapa de riesgos' },
    { nombre: 'PTAR y matriz de riesgos', descripcion: 'Módulo de PTAR y matriz de riesgos' },
    { nombre: 'Seguimiento de acciones', descripcion: 'Módulo de Seguimiento de acciones' },
    { nombre: 'Gestión de evidencias', descripcion: 'Módulo de Gestión de evidencias' },
    { nombre: 'Informes', descripcion: 'Módulo de Informes' },
    { nombre: 'Dashboard ejecutivo', descripcion: 'Módulo de Dashboard ejecutivo' },
    { nombre: 'Configuración', descripcion: 'Módulo de Configuración' }
  ];

  const modulos = [];
  for (let i = 0; i < modulosData.length; i++) {
    const modulo = await prisma.modulo.create({
      data: {
        nombre: modulosData[i].nombre,
        descripcion: modulosData[i].descripcion,
        ruta: `/${modulosData[i].nombre.toLowerCase().replace(/\s+/g, '-')}`,
        icono: 'default',
        orden: i + 1
      }
    });
    modulos.push(modulo);
  }
  return modulos;
}

async function main() {
  await seedModulos();
  console.log('Seeder de Módulos ejecutado correctamente ✅');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });