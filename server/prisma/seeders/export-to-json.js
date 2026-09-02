const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()
const outDir = path.join(__dirname, 'seed-data')

async function main() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)

  const models = {
    roles: await prisma.rol.findMany(),
    acciones: await prisma.accion.findMany(),
    modulos: await prisma.modulo.findMany(),
    recursos: await prisma.recurso.findMany(),
    permisos: await prisma.permiso.findMany(),
    rol_permiso: await prisma.rolPermiso.findMany(),
    usuarios: await prisma.usuario.findMany(),
    usuario_rol: await prisma.usuarioRol.findMany(),
    riesgos: await prisma.riesgo.findMany(),
  }

  for (const [name, data] of Object.entries(models)) {
    const file = path.join(outDir, `${name}.json`)
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
    console.log('Exported', name, '=>', file)
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
