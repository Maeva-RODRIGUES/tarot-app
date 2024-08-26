// authControllers.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Role } = require('../models/indexModels'); 

// Fonction de connexion (Login)
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    // Trouver l'utilisateur par son email et inclure le rôle
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        as: 'role',
        attributes: ['role_name']
      }
    });

    if (!user) {
      console.log('Utilisateur non trouvé avec l\'email:', email);
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Vérifiez les valeurs
    console.log('Mot de passe fourni:', password);
    console.log('Mot de passe stocké (haché):', user.password);

    // Comparer le mot de passe fourni avec le hash stocké
    const isMatch = await bcrypt.compare(password, user.password);

    console.log('Résultat de la comparaison des mots de passe:', isMatch);

    if (isMatch) {
      // Générer le token JWT
      const token = jwt.sign({ id: user.id, role: user.role.role_name }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Ajouter userId et role à la réponse
      res.json({ token, userId: user.id, role: user.role.role_name });
    } else {
      res.status(401).json({ message: 'Identifiants incorrects' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    res.status(500).json({ message: 'Erreur lors de l\'authentification' });
  }
};

module.exports = {
  login
};
