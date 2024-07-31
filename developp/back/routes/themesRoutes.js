// themesRoutes.js

const express = require('express');
const router = express.Router();
const themesControllers = require('../controllers/themesControllers');

// Route pour récupérer tous les thèmes
router.get('/', themesControllers.getAllThemes);

// Route pour récupérer un thème spécifique par son ID
router.get('/:id', themesControllers.getThemeById);

// Route pour créer un nouveau thème
router.post('/', themesControllers.createTheme);

// Route pour mettre à jour un thème par son ID
router.put('/:id', themesControllers.updateTheme);

// Route pour supprimer un thème par son ID
router.delete('/:id', themesControllers.deleteTheme);

module.exports = router;
