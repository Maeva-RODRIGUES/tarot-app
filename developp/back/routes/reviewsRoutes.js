// reviewsRoutes.js

const express = require('express');
const router = express.Router();
const reviewsControllers = require('../controllers/reviewsControllers');

// Route pour récupérer tous les avis
router.get('/', reviewsControllers.getAllReviews);

// Route pour récupérer un avis spécifique par son ID
router.get('/:id', reviewsControllers.getReviewById);

// Route pour récupérer tous les avis d'un utilisateur spécifique
router.get('/user/:userId', reviewsControllers.getReviewsByUser);

// Route pour créer un avis pour un utilisateur spécifique
router.post('/user/:userId', reviewsControllers.createReviewForUser);


// Route pour créer un nouvel avis
router.post('/', reviewsControllers.createReview);

// Route pour mettre à jour un avis par son ID
router.put('/:id', reviewsControllers.updateReview);

// Route pour supprimer un avis par son ID
router.delete('/:id', reviewsControllers.deleteReview);

module.exports = router;

