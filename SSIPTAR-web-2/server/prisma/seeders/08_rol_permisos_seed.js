const { prisma } = require('../../src/config/prisma');

async function seedRolesPermisos() {
  // Permisos del Administrador (Rol 1) → permisos del 1 al 53
  const permisosAdmin = Array.from({ length: 53 }, (_, index) => ({
    id_rol: 1,
    id_permiso: index + 1
  }));

  // Permisos Rol 2: Enlace de Administración de Riesgos
  const permisosRol2 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37
  ].map(id => ({ id_rol: 2, id_permiso: id }));

  // Permisos Rol 3: Alta Dirección
  const permisosRol3 = [2, 6, 9, 13, 33, 36].map(id => ({
    id_rol: 3,
    id_permiso: id
  }));

  // Permisos Rol 4: Unidad Administrativa
  const permisosRol4 = [
    2, 6, 9, 13, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26
  ].map(id => ({ id_rol: 4, id_permiso: id }));

  const asignaciones = [
    ...permisosAdmin,
    ...permisosRol2,
    ...permisosRol3,
    ...permisosRol4
  ];

  const resultado = await prisma.rolPermiso.createMany({
    data: asignaciones,
    skipDuplicates: true // Evita errores si ya existe la relación
  });

  return resultado.count;
}

async function main() {
  const total = await seedRolesPermisos();
  console.log(`Seeder de Roles-Permisos ejecutado correctamente ✅ (${total} relaciones insertadas)`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });