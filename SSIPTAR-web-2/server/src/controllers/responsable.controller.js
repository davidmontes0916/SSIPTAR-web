const responsableService = require('../services/responsable.service');

async function createResponsable(req, res) {
  try {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const responsable = await responsableService.createResponsable({ nombre });
    return res.status(201).json(responsable);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe un responsable con ese nombre' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el responsable' });
  }
}

async function listResponsables(req, res) {
  try {
    const responsables = await responsableService.listResponsables();
    return res.json(responsables);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al listar responsables' });
  }
}

async function getResponsableById(req, res) {
  try {
    const { id } = req.params;
    const responsable = await responsableService.getResponsableById(Number(id));

    if (!responsable) {
      return res.status(404).json({ error: 'Responsable no encontrado' });
    }

    return res.json(responsable);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener el responsable' });
  }
}

async function updateResponsable(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const responsable = await responsableService.updateResponsable(Number(id), { nombre });
    return res.json(responsable);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Responsable no encontrado' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe otro responsable con ese nombre' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar el responsable' });
  }
}

async function deleteResponsable(req, res) {
  try {
    const { id } = req.params;
    await responsableService.deleteResponsable(Number(id));
    return res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Responsable no encontrado' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar el responsable' });
  }
}

module.exports = {
  createResponsable,
  listResponsables,
  getResponsableById,
  updateResponsable,
  deleteResponsable
};


