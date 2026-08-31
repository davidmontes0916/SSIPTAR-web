const usuarioService = require('../services/usuario.service');

// Crear
exports.createUsuario = async (req, res) => {
  try {
    const user = await usuarioService.createUsuario(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar
exports.listUsuarios = async (req, res) => {
  try {
    const users = await usuarioService.listUsuarios();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consultar
exports.getUsuarioById = async (req, res) => {
  try {
    const user = await usuarioService.getUsuarioById(Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar
exports.updateUsuario = async (req, res) => {
  try {
    const user = await usuarioService.updateUsuario(Number(req.params.id), req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar
exports.deleteUsuario = async (req, res) => {
  try {
    await usuarioService.deleteUsuario(Number(req.params.id));
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
