// drawingsRoutes.js

const express = require('express');
const router = express.Router();
const drawingsControllers = require('../controllers/drawingsControllers');

// Route pour récupérer tous les tirages de tarot
router.get('/', drawingsControllers.getAllDrawings);

// Route pour récupérer les tirages d'un utilisateur spécifique
router.get('/user/:userId', drawingsControllers.getDrawingsByUserId);

// Route pour créer un tirage aléatoire basé sur le thème choisi
router.post('/random/:theme', drawingsControllers.createRandomDrawingByTheme);

// ---Route pour créer un tirage pour un utilisateur spécifique et un thème spécifique---
router.post('/user/:userId/:theme', drawingsControllers.createDrawingForUser);

// Route pour supprimer un tirage de tarot spécifique par son ID
router.delete('/:id', drawingsControllers.deleteDrawingById);

module.exports = router;
