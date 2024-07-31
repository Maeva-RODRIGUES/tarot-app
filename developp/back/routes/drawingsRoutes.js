// Contient les routes de l'API pour les opérations de tirage de tarot.
// drawingsRoutes.js :

const express = require ('express');
const router = express.Router();
const drawingsControllers = require('../controllers/drawingsControllers'); 

// Route pour récupérer tous les tirages de tarot
router.get('/', drawingsControllers.getAllDrawings);

// Route pour créer un tirage aléatoire basé sur le thème choisi
router.post('/random/:theme', drawingsControllers.createRandomDrawingByTheme);


// Route pour supprimer un tirage de tarot spécifique par son ID
router.delete('/:id', drawingsControllers.deleteDrawingById);

module.exports = router;