const { prisma } = require('../../src/config/prisma');

async function seedRoles() {
  const rolesData = [
    { nombre: 'Administrador', descripcion: 'Acceso completo al sistema', estado: 'Activo' },
    { nombre: 'Enlace de Administración de Riesgos', descripcion: 'Gestión de riesgos', estado: 'Activo' },
    { nombre: 'Alta Dirección', descripcion: 'Supervisión ejecutiva', estado: 'Activo' },
    { nombre: 'Unidad Administrativa', descripcion: 'Gestión de reportes y carga de evidencias', estado: 'Activo' }
  ];

  const roles = [];
  for (const rol of rolesData) {
    const r = await prisma.rol.create({ data: rol });
    roles.push(r);
  }
  return roles;
}

async function main() {
  await seedRoles();
  console.log('Seeder de Roles ejecutado correctamente ✅');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });