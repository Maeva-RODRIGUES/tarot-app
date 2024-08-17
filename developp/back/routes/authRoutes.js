// authRoutes.js

const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// Route pour l'authentification et la génération d'un jeton JWT
router.post('/login', authControllers.login);


// Route pour permettre aux utilisateurs de demander une réinitialisation de mot de passe.
router.post('/forgot-password', authControllers.forgotPassword);

// Route pour réinitialiser le mot de passe
router.put('/reset-password/:token', authControllers.resetPassword);


module.exports = router;