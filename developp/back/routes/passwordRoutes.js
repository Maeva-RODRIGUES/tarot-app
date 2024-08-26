// passwordRoutes.js 

const express = require('express');
const router = express.Router();
const passwordControllers  = require('../controllers/passwordControllers');

// Route pour permettre aux utilisateurs de demander une réinitialisation de mot de passe.
router.post('/forgot-password', passwordControllers.forgotPassword);

// Route pour réinitialiser le mot de passe
router.put('/reset-password/:token', passwordControllers.resetPassword);

module.exports = router;
