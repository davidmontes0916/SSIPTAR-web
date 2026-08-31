const express = require('express');
const router = express.Router();
const riesgoController = require('../controllers/riesgo.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { checkPermission } = require('../middleware/permission.middleware');

// CRUD Riesgos con permisos (recurso Riesgos id = 2)
router.post('/riesgos',
  authenticateToken,
  checkPermission(2, 1), // recurso Riesgos (2), acción create (1)
  riesgoController.createRiesgo
);

router.get('/riesgos',
  authenticateToken,
  checkPermission(2, 5), // recurso Riesgos (2), acción list (5)
  riesgoController.listRiesgos
);

router.get('/riesgos/:id',
  authenticateToken,
  checkPermission(2, 2), // recurso Riesgos (2), acción read (2)
  riesgoController.getRiesgoById
);

router.put('/riesgos/:id',
  authenticateToken,
  checkPermission(2, 3), // recurso Riesgos (2), acción update (3)
  riesgoController.updateRiesgo
);

router.delete('/riesgos/:id',
  authenticateToken,
  checkPermission(2, 4), // recurso Riesgos (2), acción delete (4)
  riesgoController.deleteRiesgo
);

module.exports = router;