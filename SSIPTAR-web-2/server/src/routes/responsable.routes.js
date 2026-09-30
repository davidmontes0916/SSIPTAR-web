const express = require('express');
const router = express.Router();
const responsableController = require('../controllers/responsable.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { checkPermission } = require('../middleware/permission.middleware');

// CRUD Responsables con permisos (recurso Responsables id = ?)
router.post('/responsables',
  authenticateToken,
  checkPermission(16, 1), // recurso Responsables, acción create
  responsableController.createResponsable
);

router.get('/responsables',
  authenticateToken,
  checkPermission(16, 5), // recurso Responsables, acción list
  responsableController.listResponsables
);

router.get('/responsables/:id',
  authenticateToken,
  checkPermission(16, 2), // recurso Responsables, acción read
  responsableController.getResponsableById
);

router.put('/responsables/:id',
  authenticateToken,
  checkPermission(16, 3), // recurso Responsables, acción update
  responsableController.updateResponsable
);

router.delete('/responsables/:id',
  authenticateToken,
  checkPermission(16, 4), // recurso Responsables, acción delete
  responsableController.deleteResponsable
);

module.exports = router;

