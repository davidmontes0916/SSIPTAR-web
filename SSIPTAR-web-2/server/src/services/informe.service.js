const { prisma } = require('../config/prisma');

async function createInforme(data) {
  return await prisma.informe.create({ data });
}

async function listInformes() {
  return await prisma.informe.findMany({
    include: {
      usuario: {
        select: {
          id_usuario: true,
          nombre: true,
          apellido_paterno: true,
          correo: true
        }
      }
    }
  });
}

async function getInformeById(id_informe) {
  return await prisma.informe.findUnique({
    where: { id_informe },
    include: {
      usuario: {
        select: {
          id_usuario: true,
          nombre: true,
          apellido_paterno: true,
          correo: true
        }
      }
    }
  });
}

async function updateInforme(id_informe, data) {
  return await prisma.informe.update({
    where: { id_informe },
    data
  });
}

async function deleteInforme(id_informe) {
  return await prisma.informe.delete({ where: { id_informe } });
}

async function usuarioExiste(id_usuario) {
  const usuario = await prisma.usuario.findUnique({ where: { id_usuario } });
  return !!usuario;
}

module.exports = {
  createInforme,
  listInformes,
  getInformeById,
  updateInforme,
  deleteInforme,
  usuarioExiste
};