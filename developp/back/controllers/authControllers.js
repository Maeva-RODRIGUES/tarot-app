//authControllers.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Role } = require('../models/indexModels'); 

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Requête de connexion reçue avec:', req.body);

  try {
    // Trouver l'utilisateur par son email et inclure le rôle
    const user = await User.findOne({ 
      where: { email },
      include: {
        model: Role,
        as: 'role',
        attributes: ['role_name'] // Assurez-vous que le modèle Role a un champ 'role_name'
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Comparer le mot de passe fourni avec le hash stocké
    const isMatch = await bcrypt.compare(password, user.password);

    // Afficher le résultat de la comparaison pour le débogage
    console.log('Password match:', isMatch);

    if (isMatch) {
      // Générer le token JWT
      const token = jwt.sign({ id: user.id, role: user.role.role_name }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Ajouter userId et role à la réponse
      res.json({ token, userId: user.id, role: user.role.role_name });
    } else {
      res.status(401).json({ message: 'Identifiants incorrects' });
    }
  } catch (error) {
    // Affichez l'erreur dans la console pour le débogage
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erreur lors de l\'authentification' });
  }
};

module.exports = {
  login,
};