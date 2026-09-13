const { prisma } = require('../../src/config/prisma');

async function seedRecursos() {
  const recursosData = [
    { nombre: 'Riesgos',                        descripcion: 'Gestión de riesgos' },
    { nombre: 'Acciones de control',            descripcion: 'Gestión de acciones de control' },
    { nombre: 'Mapa de riesgos',                descripcion: 'Visualización e informes del mapa de riesgos' },
    { nombre: 'Archivos PTAR y Matriz de riesgos', descripcion: 'Documentos de PTAR y Matriz de riesgos' },
    { nombre: 'Archivos',                       descripcion: 'Gestión general de archivos' },
    { nombre: 'Seguimiento de acciones',        descripcion: 'Módulo de seguimiento a las acciones' },
    { nombre: 'Reportes trimestrales',          descripcion: 'Generación y consulta de reportes trimestrales' },
    { nombre: 'Evidencias',                     descripcion: 'Gestión de evidencias' },
    { nombre: 'Comentarios',                    descripcion: 'Comentarios y retroalimentación' },
    { nombre: 'Gestión de evidencias',          descripcion: 'Módulo específico de gestión de evidencias' },
    { nombre: 'Informes',                       descripcion: 'Generación de informes generales' },
    { nombre: 'Dashboard ejecutivo',            descripcion: 'Tablero con métricas e indicadores ejecutivos' },
    { nombre: 'Usuarios',                       descripcion: 'Gestión de usuarios del sistema' },
    { nombre: 'Roles',                          descripcion: 'Gestión de roles de usuario' },
    { nombre: 'Unidades Administrativas',       descripcion: 'Catálogo de unidades administrativas' },
    { nombre: 'Responsables',                   descripcion: 'Catálogo de responsables' }
  ];

  const recursos = [];
  for (const recurso of recursosData) {
    const r = await prisma.recurso.create({ data: recurso });
    recursos.push(r);
  }
  return recursos;
}

async function main() {
  const recursos = await seedRecursos();
  console.log(`Seeder de Recursos ejecutado correctamente ✅ (${recursos.length} recursos insertados)`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });