 const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()
const dataDir = path.join(__dirname, 'seed-data')

function readJSON(name) {
  const p = path.join(dataDir, name)
  if (!fs.existsSync(p)) return null
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

async function main() {
  const roles = readJSON('roles.json')
  const acciones = readJSON('acciones.json')
  const modulos = readJSON('modulos.json')
  const recursos = readJSON('recursos.json')
  const permisos = readJSON('permisos.json')
  const rol_permiso = readJSON('rol_permiso.json')
  const usuarios = readJSON('usuarios.json')
  const usuario_rol = readJSON('usuario_rol.json')
  const riesgos = readJSON('riesgos.json')

  console.log('Seeding from', dataDir)

  await prisma.$transaction(async (tx) => {
    if (roles && roles.length) {
      for (const r of roles) {
        await tx.rol.upsert({ where: { id_rol: r.id_rol }, update: r, create: r })
      }
      console.log('roles seeded')
    }

    if (acciones && acciones.length) {
      for (const a of acciones) {
        await tx.accion.upsert({ where: { id_accion: a.id_accion }, update: a, create: a })
      }
      console.log('acciones seeded')
    }

    if (modulos && modulos.length) {
      for (const m of modulos) {
        await tx.modulo.upsert({ where: { id_modulo: m.id_modulo }, update: m, create: m })
      }
      console.log('modulos seeded')
    }

    if (recursos && recursos.length) {
      for (const r of recursos) {
        await tx.recurso.upsert({ where: { id_recurso: r.id_recurso }, update: r, create: r })
      }
      console.log('recursos seeded')
    }

    if (permisos && permisos.length) {
      for (const p of permisos) {
        await tx.permiso.upsert({ where: { id_permiso: p.id_permiso }, update: p, create: p })
      }
      console.log('permisos seeded')
    }

    if (rol_permiso && rol_permiso.length) {
      await tx.rolPermiso.createMany({ data: rol_permiso, skipDuplicates: true })
      console.log('rol_permiso seeded')
    }

    if (usuarios && usuarios.length) {
      for (const u of usuarios) {
        const { contrasena, ...rest } = u
        await tx.usuario.upsert({ where: { correo: u.correo }, update: rest, create: u })
      }
      console.log('usuarios seeded')
    }

    if (usuario_rol && usuario_rol.length) {
      await tx.usuarioRol.createMany({ data: usuario_rol, skipDuplicates: true })
      console.log('usuario_rol seeded')
    }

    if (riesgos && riesgos.length) {
      await tx.riesgo.createMany({ data: riesgos, skipDuplicates: true })
      console.log('riesgos seeded')
    }
  })
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
