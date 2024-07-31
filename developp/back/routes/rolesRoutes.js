// rolesRoutes.js

const express = require('express');
const router = express.Router();
const rolesControllers = require('../controllers/rolesControllers');

// Route pour récupérer tous les rôles
router.get('/', rolesControllers.getAllRoles);

// Route pour récupérer un rôle spécifique par son ID
router.get('/:id', rolesControllers.getRoleById);

// Route pour créer un nouveau rôle
router.post('/', rolesControllers.createRole);

// Route pour mettre à jour un rôle par son ID
router.put('/:id', rolesControllers.updateRole);

// Route pour supprimer un rôle par son ID
router.delete('/:id', rolesControllers.deleteRole);

module.exports = router;
