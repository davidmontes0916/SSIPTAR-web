const { prisma } = require('../../src/config/prisma');

// Crear recurso Unidades Administrativas
async function seedRecursoUnidades() {
  return await prisma.recurso.create({
    data: {
      nombre: 'Unidades Administrativas',
      descripcion: 'Gestión de unidades administrativas en la matriz'
    }
  });
}

// Crear recurso Responsables
async function seedRecursoResponsables() {
  return await prisma.recurso.create({
    data: {
      nombre: 'Responsables',
      descripcion: 'Gestión de responsables en la matriz'
    }
  });
}

// Crear permisos para un recurso y asignarlos al rol Administrador
async function seedPermisosGenericos(recurso, acciones, rolAdmin, moduloMatriz) {
  const permisos = [];
  for (const accion of acciones) {
    const permiso = await prisma.permiso.create({
      data: {
        nombre: `${recurso.nombre} - ${accion.nombre_visible}`,
        id_modulo: moduloMatriz.id_modulo,
        id_recurso: recurso.id_recurso,
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
  let acciones = await prisma.accion.findMany();
  if (acciones.length === 0) throw new Error('No existen acciones, ejecuta primero el seeder de acciones');

  // Filtrar solo acciones con id 1–4
  acciones = acciones.filter(a => a.id_accion >= 1 && a.id_accion <= 4);

  // Crear recurso Unidades Administrativas
  const recursoUnidades = await seedRecursoUnidades();
  await seedPermisosGenericos(recursoUnidades, acciones, rolAdmin, moduloMatriz);

  // Crear recurso Responsables
  const recursoResponsables = await seedRecursoResponsables();
  await seedPermisosGenericos(recursoResponsables, acciones, rolAdmin, moduloMatriz);

  console.log('Seeder de Unidades Administrativas y Responsables ejecutado correctamente ✅ (solo acciones 1–4)');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
