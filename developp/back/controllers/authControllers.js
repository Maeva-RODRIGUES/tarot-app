//authControllers.js

const { sendEtherealEmail } = require('../utils/etherealEmail'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { User, Role } = require('../models/indexModels'); 

// ------------------------------------------------------------
// Fonction de connexion (Login)
// ------------------------------------------------------------
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


// ------------------------------------------------------------
// Fonction pour gérer la demande de réinitialisation de mot de passe
// ------------------------------------------------------------
const forgotPassword = async (req, res) => {
  const { email } = req.body; // Récupération de l'email depuis la requête

  try {
    // Recherche de l'utilisateur par son email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Génération d'un token JWT avec une durée de vie de 1 heure
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token généré:', token); // Ajoutez cette ligne pour vérifier le token généré

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${token}`; // Création du lien de réinitialisation avec le token
    console.log('URL de réinitialisation:', resetUrl);

    // Envoi de l'email avec Ethereal
    await sendEtherealEmail(user.email, 'Réinitialisation de votre mot de passe', `Cliquez sur ce lien pour réinitialiser votre mot de passe: ${resetUrl}`);

    // Réponse indiquant que l'email a été envoyé
    res.json({ message: 'Un email a été envoyé avec des instructions pour réinitialiser votre mot de passe.' });
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    res.status(500).json({ message: 'Erreur lors de la demande de réinitialisation' });
  }
};

// ------------------------------------------------------------
// Fonction pour réinitialiser le mot de passe
// ------------------------------------------------------------
const resetPassword = async (req, res) => {
  const { token } = req.params; // Récupération du token depuis les paramètres de l'URL
  const { password } = req.body; // Récupération du nouveau mot de passe depuis la requête

  try {
    console.log('Token reçu pour réinitialisation:', token);
    // Vérification du token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Décodage du token réussi, ID utilisateur:', decoded.id);
    const user = await User.findByPk(decoded.id); // Recherche de l'utilisateur par son ID

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Hachage du nouveau mot de passe et mise à jour de l'utilisateur
    user.password = await bcrypt.hash(password, 10);
    console.log('Mot de passe haché:', user.password); 
    await user.save();

    // Réponse indiquant que le mot de passe a été réinitialisé
    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe' });
  }
};

// Exportation des fonctions de contrôleur
module.exports = {
  login,
  forgotPassword, // Ajout de la fonction forgotPassword pour la réinitialisation
  resetPassword, // Ajout de la fonction resetPassword pour la mise à jour du mot de passe
};