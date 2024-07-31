// uploadControllers.js

const fs = require('fs');
const path = require('path');
const { Card } = require('../models/indexModels'); 

// Fonction pour télécharger un fichier et mettre à jour l'URL de l'image dans la table cards
const uploadFile = async (req, res) => {
  try {
    const { id } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    // Mettre à jour le champ image_url dans la table cards
    const card = await Card.findByPk(id);
    if (card) {
      card.image_url = imageUrl;
      await card.save();
      res.json({ message: 'Fichier téléchargé avec succès', file: req.file, card });
    } else {
      res.status(404).json({ message: 'Carte non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du téléchargement du fichier', error });
  }
};

// Fonction pour lister tous les fichiers dans le dossier uploads
const listFiles = (req, res) => {
  fs.readdir('uploads/', (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la lecture des fichiers', error: err });
    }
    res.json({ files });
  });
};

// Fonction pour récupérer un fichier spécifique
const getFile = (req, res) => {
  const filepath = path.join(__dirname, '../uploads', req.params.filename);
  res.sendFile(filepath);
};

// Fonction pour mettre à jour un fichier existant
const updateFile = async (req, res) => {
  try {
    const { id } = req.body;

    // Mettre à jour le champ image_url dans la table cards
    const card = await Card.findByPk(id);
    if (card) {
      if (req.file) {
        card.image_url = `/uploads/${req.file.filename}`;
        await card.save();
      }
      res.json({ message: 'Fichier mis à jour avec succès', file: req.file, card });
    } else {
      res.status(404).json({ message: 'Carte non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du fichier', error });
  }
};

// Fonction pour supprimer un fichier
const deleteFile = (req, res) => {
  const filepath = path.join(__dirname, '../uploads', req.params.filename);
  fs.unlink(filepath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du fichier', error: err });
    }
    res.json({ message: 'Fichier supprimé avec succès' });
  });
};

module.exports = {
  uploadFile,
  listFiles,
  getFile,
  updateFile,
  deleteFile
};
