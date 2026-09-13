const { prisma } = require('../../src/config/prisma');
const bcrypt = require('bcryptjs');

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

async function seedModulos() {
  const modulosNombres = [
    'Matriz de seguimiento',
    'Mapa de riesgos',
    'PTAR y matriz de riesgos',
    'Seguimiento de acciones',
    'Gestión de evidencias',
    'Informes',
    'Dashboard ejecutivo',
    'Configuración'
  ];

  const modulos = [];
  for (let i = 0; i < modulosNombres.length; i++) {
    const modulo = await prisma.modulo.create({
      data: {
        nombre: modulosNombres[i],
        descripcion: `Módulo de ${modulosNombres[i]}`,
        ruta: `/${modulosNombres[i].toLowerCase().replace(/\s+/g, '-')}`,
        icono: 'default',
        orden: i + 1
      }
    });
    modulos.push(modulo);
  }
  return modulos;
}

async function seedAcciones() {
  const accionesData = [
    { nombre: 'create', nombre_visible: 'Crear', descripcion: 'Crear registros' },
    { nombre: 'read', nombre_visible: 'Consultar', descripcion: 'Consultar registros individuales' },
    { nombre: 'update', nombre_visible: 'Editar', descripcion: 'Actualizar registros' },
    { nombre: 'delete', nombre_visible: 'Eliminar', descripcion: 'Eliminar registros' },
    { nombre: 'list', nombre_visible: 'Listar', descripcion: 'Listar todos los registros' }
  ];

  const acciones = [];
  for (const accion of accionesData) {
    const a = await prisma.accion.create({ data: accion });
    acciones.push(a);
  }
  return acciones;
}

async function seedRecursoUsuarios() {
  return await prisma.recurso.create({
    data: {
      nombre: 'Usuarios',
      descripcion: 'Gestión de usuarios del sistema'
    }
  });
}

async function seedPermisosDashboardEjecutivo(acciones, recursoUsuarios, moduloDashboard, rolAdmin) {
  const permisos = [];
  for (const accion of acciones) {
    const permiso = await prisma.permiso.create({
      data: {
        nombre: `Usuarios - ${accion.nombre_visible}`,
        id_modulo: moduloDashboard.id_modulo,
        id_recurso: recursoUsuarios.id_recurso,
        id_accion: accion.id_accion
      }
    });
    permisos.push(permiso);

    await prisma.rolPermiso.create({
      data: {
        id_rol: rolAdmin.id_rol,
        id_permiso: permiso.id_permiso
      }
    });
  }
  return permisos;
}

async function seedUsuarioAdmin(rolAdmin) {
  const hashedPassword = await bcrypt.hash('Admin1234', 10);
  const usuarioAdmin = await prisma.usuario.create({
    data: {
      nombre: 'Admin',
      apellido_paterno: 'Principal',
      apellido_materno: 'Sistema',
      correo: 'admin@sistema.com',
      contrasena: hashedPassword,
      estado: 'Activo'
    }
  });

  await prisma.usuarioRol.create({
    data: {
      id_usuario: usuarioAdmin.id_usuario,
      id_rol: rolAdmin.id_rol
    }
  });

  return usuarioAdmin;
}

async function main() {
  const roles = await seedRoles();
  const rolAdmin = roles.find(r => r.nombre === 'Administrador');

  const modulos = await seedModulos();
  const moduloDashboard = modulos.find(m => m.nombre === 'Dashboard ejecutivo');

  const acciones = await seedAcciones();
  const recursoUsuarios = await seedRecursoUsuarios();

  await seedPermisosDashboardEjecutivo(acciones, recursoUsuarios, moduloDashboard, rolAdmin);
  await seedUsuarioAdmin(rolAdmin);

  console.log('Seeder RBAC ejecutado correctamente ✅');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
