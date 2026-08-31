const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { checkPermission } = require('../middleware/permission.middleware');

// CRUD Usuarios con permisos
router.post('/usuarios',
  authenticateToken,
  checkPermission(1, 1), // recurso Usuarios, acción create
  usuarioController.createUsuario
);

router.get('/usuarios',
  authenticateToken,
  checkPermission(1, 5), // recurso Usuarios, acción list
  usuarioController.listUsuarios
);

router.get('/usuarios/:id',
  authenticateToken,
  checkPermission(1, 2), // recurso Usuarios, acción read
  usuarioController.getUsuarioById
);

router.put('/usuarios/:id',
  authenticateToken,
  checkPermission(1, 3), // recurso Usuarios, acción update
  usuarioController.updateUsuario
);

router.delete('/usuarios/:id',
  authenticateToken,
  checkPermission(1, 4), // recurso Usuarios, acción delete
  usuarioController.deleteUsuario
);

module.exports = router;
