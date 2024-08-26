// validationMiddleware.js

const { body, validationResult } = require('express-validator');

// Middleware de validation pour les entrées utilisateur
const validateUser = [
  body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
  body('name').notEmpty().withMessage('Le nom est requis').trim().escape(),
  body('surname').notEmpty().withMessage('Le prénom est requis').trim().escape(),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères').trim().escape(),
  body('birthday').optional().isDate({ format: 'YYYY-MM-DD' }).withMessage('Date de naissance invalide'),
  body('city_of_birth').optional().trim().escape(),
  body('time_of_birth').optional().trim().escape(),
  // Autres validations selon les champs...

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateUser };
