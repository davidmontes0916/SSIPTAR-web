const { prisma } = require('../../src/config/prisma');

async function seedModulos() {
  const modulosData = [
    {
      nombre: 'Dashboard administrativo',
      descripcion: 'Panel principal de administración',
      ruta: '/dashboard',
      icono: 'dashboard',
      orden: 1
    },
    {
      nombre: 'Matriz de seguimiento',
      descripcion: 'Gestión de riesgos y acciones de control',
      ruta: '/matriz',
      icono: 'table',
      orden: 2
    }
  ];

  const modulos = [];
  for (const modulo of modulosData) {
    const m = await prisma.modulo.create({ data: modulo });
    modulos.push(m);
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