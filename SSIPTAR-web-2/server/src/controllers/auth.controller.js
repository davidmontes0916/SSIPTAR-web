const { registerUser, loginUser } = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const { token, user } = await loginUser(correo, contrasena);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
