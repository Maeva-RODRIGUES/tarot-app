// passwordControllers.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/indexModels');
const { sendEtherealEmail } = require('../utils/etherealEmail'); 

// ------------------------------------------------------------
// Fonction pour gérer la demande de réinitialisation de mot de passe
// ------------------------------------------------------------
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Recherche de l'utilisateur par son email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Génération d'un token JWT avec une durée de vie de 1 heure
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token généré:', token);

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
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
  const { token } = req.params;
  const { password } = req.body;

  try {
    console.log('Token reçu pour réinitialisation:', token);

    // Vérification du token JWT avec gestion des erreurs
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Décodage du token réussi, ID utilisateur:', decoded.id);
    } catch (err) {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }

    // Recherche de l'utilisateur par son ID
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Validation du mot de passe
    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères.' });
    }

    // Hachage du nouveau mot de passe et mise à jour de l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe' });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
