// Installer les dépendances suivantes avant de coder ce fichier : 
// 1. jsonwebtoken : Pour la création et la vérification des tokens JWT.
// auth.js contient les implémentations des fonctions nécessaires pour gérer les authentifications comme : Créer et vérifier les tokens JWT pour sécuriser les routes.

const jwt = require('jsonwebtoken');
const { User } = require('../models/indexModels');



// Générer un token JWT avec expiration d'une heure
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware pour protéger les routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
          token = req.headers.authorization.split(' ')[1];
          console.log('Token reçu :', token); // Vérifiez le token reçu depuis l'en-tête Authorization
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log('Token décodé :', decoded); // Vérifiez le token décodé pour voir les informations utilisateur

          // Rechercher l'utilisateur dans la base de données
          const user = await User.findByPk(decoded.id);
          if (!user) {
              return res.status(401).json({ message: 'Utilisateur non trouvé' });
          }

          req.user = user; // Attacher l'utilisateur trouvé à la requête
          next();
      } catch (error) {
          console.error('Erreur de vérification du token :', error);
          res.status(401).json({ message: 'Non autorisé, token invalide' });
      }
  } else {
      res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      // Recherche de l'utilisateur par son ID avec inclusion du rôle associé
      const user = await User.findByPk(req.user.id, { include: 'role' });
      console.log('Utilisateur trouvé :', user);

      // Vérification si l'utilisateur existe
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }
      console.log('Rôle de l\'utilisateur :', user.role.role_name);

      // Vérification si le rôle de l'utilisateur est inclus dans les rôles autorisés
      if (!roles.includes(user.role.role_name)) {
        return res.status(403).json({ message: 'Accès interdit' });
      }

      // Autorisation accordée, passer au middleware suivant
      next();
    } catch (error) {
      console.error('Erreur d\'autorisation :', error);
      res.status(500).json({ message: 'Erreur d\'autorisation' });
    }
  };
};

module.exports = { generateToken, protect, authorize };
