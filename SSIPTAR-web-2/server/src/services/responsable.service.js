const { prisma } = require('../config/prisma');

async function createResponsable(data) {
  return await prisma.responsable.create({ data });
}

async function listResponsables() {
  return await prisma.responsable.findMany();
}

async function getResponsableById(id_responsable) {
  return await prisma.responsable.findUnique({ where: { id_responsable } });
}

async function updateResponsable(id_responsable, data) {
  return await prisma.responsable.update({
    where: { id_responsable },
    data
  });
}

async function deleteResponsable(id_responsable) {
  return await prisma.responsable.delete({ where: { id_responsable } });
}

module.exports = {
  createResponsable,
  listResponsables,
  getResponsableById,
  updateResponsable,
  deleteResponsable
};