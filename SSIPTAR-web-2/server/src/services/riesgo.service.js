const { prisma } = require('../config/prisma');

// Crear riesgo
async function createRiesgo(data) {
  return prisma.riesgo.create({
    data: {
      anio: parseInt(data.anio),
      numero: parseInt(data.numero),
      descripcion: data.descripcion
    }
  });
}

// Listar riesgos con campos específicos
async function listRiesgos() {
  return prisma.riesgo.findMany({
    select: {
      id_riesgo: true,
      anio: true,
      numero: true,
      descripcion: true
    },
    orderBy: [
      {
        anio: 'desc'
      },
      {
        numero: 'desc'
      }
    ]
  });
}

// Consultar riesgo por ID
async function getRiesgoById(id_riesgo) {
  return prisma.riesgo.findUnique({
    where: { id_riesgo },
    select: {
      id_riesgo: true,
      anio: true,
      numero: true,
      descripcion: true
    }
  });
}

// Editar riesgo
async function updateRiesgo(id_riesgo, data) {
  const updateData = {};
  
  if (data.anio !== undefined) updateData.anio = parseInt(data.anio);
  if (data.numero !== undefined) updateData.numero = parseInt(data.numero);
  if (data.descripcion !== undefined) updateData.descripcion = data.descripcion;
  
  return prisma.riesgo.update({
    where: { id_riesgo },
    data: updateData
  });
}

// Eliminar riesgo físicamente
async function deleteRiesgo(id_riesgo) {
  return prisma.riesgo.delete({ 
    where: { id_riesgo } 
  });
}

// Buscar riesgo por año y número (útil para validaciones)
async function findRiesgoByAnioNumero(anio, numero) {
  return prisma.riesgo.findFirst({
    where: {
      anio: parseInt(anio),
      numero: parseInt(numero)
    }
  });
}

// Obtener el siguiente número para un año específico
async function getNextNumero(anio) {
  const lastRiesgo = await prisma.riesgo.findFirst({
    where: { anio: parseInt(anio) },
    orderBy: { numero: 'desc' },
    select: { numero: true }
  });
  
  return lastRiesgo ? lastRiesgo.numero + 1 : 1;
}

module.exports = {
  createRiesgo,
  listRiesgos,
  getRiesgoById,
  updateRiesgo,
  deleteRiesgo,
  findRiesgoByAnioNumero,
  getNextNumero
};