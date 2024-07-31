//authControllers.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models/indexModels'); // chemin du fichier indexModels ou tous les models sont centralisés

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trouver l'utilisateur par son email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Comparer le mot de passe fourni avec le hash stocké
    const isMatch = await bcrypt.compare(password, user.password);

    // Afficher le résultat de la comparaison pour le débogage
    console.log('Password match:', isMatch);

    if (isMatch) {
      // Générer le token JWT
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
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

