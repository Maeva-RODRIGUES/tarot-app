// authRoutes.js

const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// Route pour l'authentification et la génération d'un jeton JWT
router.post('/login', authControllers.login);

module.exports = router;