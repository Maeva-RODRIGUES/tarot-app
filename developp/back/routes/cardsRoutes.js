//Fichier de routes dédié pour gérer les données de cards.js
// cardsRoutes.js

const express = require('express');
const router = express.Router();
const cardsControllers = require('../controllers/cardsControllers');

// Route pour récupérer toutes les cartes du tarot
router.get('/', cardsControllers.getAllCards);

// Route pour récupérer une carte spécifique par son ID
router.get('/:id', cardsControllers.getCardById);

// Route pour créer une nouvelle carte
router.post('/', cardsControllers.createCard);

// Route pour mettre à jour une carte spécifique par son ID
router.put('/:id', cardsControllers.updateCardById);

// Route pour supprimer une carte spécifique par son ID
router.delete('/:id', cardsControllers.deleteCardById);

module.exports = router;
