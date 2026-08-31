const riesgoService = require('../services/riesgo.service');

// Crear
exports.createRiesgo = async (req, res) => {
  try {
    const riesgo = await riesgoService.createRiesgo(req.body);
    res.status(201).json(riesgo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar
exports.listRiesgos = async (req, res) => {
  try {
    const riesgos = await riesgoService.listRiesgos();
    res.json(riesgos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consultar
exports.getRiesgoById = async (req, res) => {
  try {
    const riesgo = await riesgoService.getRiesgoById(Number(req.params.id));
    if (!riesgo) return res.status(404).json({ message: 'Riesgo no encontrado' });
    res.json(riesgo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar
exports.updateRiesgo = async (req, res) => {
  try {
    const riesgo = await riesgoService.updateRiesgo(Number(req.params.id), req.body);
    res.json(riesgo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar
exports.deleteRiesgo = async (req, res) => {
  try {
    await riesgoService.deleteRiesgo(Number(req.params.id));
    res.json({ message: 'Riesgo eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};