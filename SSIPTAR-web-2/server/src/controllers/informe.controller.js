const informeService = require('../services/informe.service');

async function createInforme(req, res) {
  try {
    const { id_usuario } = req.body;

    // Validación: id_usuario obligatorio
    if (!id_usuario) {
      return res.status(400).json({ message: 'El campo id_usuario es obligatorio' });
    }

    // Validación: ¿existe el usuario?
    const existe = await informeService.usuarioExiste(id_usuario);
    if (!existe) {
      return res.status(404).json({ message: `El usuario con id ${id_usuario} no existe` });
    }

    // Crear el informe
    const informe = await informeService.createInforme({ id_usuario });
    return res.status(201).json(informe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el informe' });
  }
}

async function listInformes(req, res) {
  try {
    const informes = await informeService.listInformes();
    return res.json(informes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al listar informes' });
  }
}

async function getInformeById(req, res) {
  try {
    const { id } = req.params;
    const informe = await informeService.getInformeById(Number(id));

    if (!informe) {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }

    return res.json(informe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener el informe' });
  }
}

async function updateInforme(req, res) {
  try {
    const { id } = req.params;
    const { id_usuario } = req.body;

    if (!id_usuario) {
      return res.status(400).json({ message: 'El campo id_usuario es obligatorio' });
    }

    const existe = await informeService.usuarioExiste(id_usuario);
    if (!existe) {
      return res.status(404).json({ message: `El usuario con id ${id_usuario} no existe` });
    }

    const informe = await informeService.updateInforme(Number(id), { id_usuario });
    return res.json(informe);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el informe' });
  }
}

async function deleteInforme(req, res) {
  try {
    const { id } = req.params;
    await informeService.deleteInforme(Number(id));
    return res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el informe' });
  }
}

module.exports = {
  createInforme,
  listInformes,
  getInformeById,
  updateInforme,
  deleteInforme
};