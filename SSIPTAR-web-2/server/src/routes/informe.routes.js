const express = require('express');
console.log('✅ informe.routes.js cargado correctamente');
const router = express.Router();
const informeController = require('../controllers/informe.controller');
const { authenticateToken } = require('../middleware/auth.middleware');
const { checkPermission } = require('../middleware/permission.middleware');

router.post('/informes',
  authenticateToken,
  checkPermission(12, 1),  // recurso Informes (12), acción create (1)
  informeController.createInforme
);

router.get('/informes',
  authenticateToken,
  checkPermission(12, 5),  // recurso Informes (12), acción list (5)
  informeController.listInformes
);

router.get('/informes/:id',
  authenticateToken,
  checkPermission(12, 2),  // recurso Informes (12), acción read (2)
  informeController.getInformeById
);

router.put('/informes/:id',
  authenticateToken,
  checkPermission(12, 3),  // recurso Informes (12), acción update (3)
  informeController.updateInforme
);

router.delete('/informes/:id',
  authenticateToken,
  checkPermission(12, 4),  // recurso Informes (12), acción delete (4)
  informeController.deleteInforme
);

module.exports = router;