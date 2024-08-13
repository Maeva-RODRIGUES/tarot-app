// uploadControllers.js

const fs = require('fs');
const path = require('path');
const { Card } = require('../models/indexModels');

// Fonction pour télécharger un fichier et mettre à jour l'URL de l'image dans la table cards
const uploadFile = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("ID de la carte:", id);
    console.log("Fichier téléchargé:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier n'a été téléchargé." });
    }

    const imageUrl = `/uploads/tarot/${req.file.filename}`;
    

    const card = await Card.findByPk(id);
    if (card) {
      const oldImagePath = path.join(__dirname, '..', card.image_url);
      if (card.image_url && fs.existsSync(oldImagePath)) {
        console.log("Suppression de l'ancienne image:", oldImagePath);
        fs.unlinkSync(oldImagePath);
      }

      card.image_url = imageUrl;
      await card.save();
      console.log("URL de l'image mise à jour dans la base de données:", card.image_url);
      res.json({ message: 'Fichier téléchargé avec succès', file: req.file, card });
    } else {
      console.log("Carte non trouvée pour l'ID:", id);
      res.status(404).json({ message: 'Carte non trouvée' });
    }
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier:", error);
    res.status(500).json({ message: 'Erreur lors du téléchargement du fichier', error });
  }
};

// Fonction pour lister tous les fichiers dans le dossier uploads
const listFiles = (req, res) => {
  const directoryPath = path.join(__dirname, '../uploads/tarot/'); // Spécifiez le sous-dossier

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la lecture des fichiers', error: err });
    }
    res.json({ files });
  });
};
// Fonction pour récupérer un fichier spécifique
const getFile = (req, res) => {
  const filepath = path.join(__dirname, '../uploads/tarot/', req.params.filename);
  console.log("Chemin du fichier à récupérer:", filepath);
  res.sendFile(filepath);
};

// Fonction pour mettre à jour un fichier existant
const updateFile = async (req, res) => {
  try {
    const { id } = req.body;
    const filename = req.file ? req.file.filename : undefined;
    console.log("ID de la carte:", id);
    console.log("Nom du fichier à mettre à jour:", filename);
    console.log("Fichier téléchargé:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier n'a été téléchargé." });
    }

    const card = await Card.findByPk(id);
    if (card) {
      const oldImagePath = path.join(__dirname, '..', 'uploads/tarot/', path.basename(card.image_url));
      if (card.image_url && fs.existsSync(oldImagePath)) {
        console.log("Suppression de l'ancienne image:", oldImagePath);
        fs.unlinkSync(oldImagePath);
      }

      card.image_url = `/uploads/tarot/${req.file.filename}`;
      await card.save();
      console.log("URL de l'image mise à jour dans la base de données:", card.image_url);
      res.json({ message: 'Fichier mis à jour avec succès', file: req.file, card });
    } else {
      console.log("Carte non trouvée pour l'ID:", id);
      res.status(404).json({ message: 'Carte non trouvée' });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du fichier:", error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du fichier', error });
  }
};

// Fonction pour supprimer un fichier
const deleteFile = (req, res) => {
  const filepath = path.join(__dirname, '../uploads/tarot/', req.params.filename);
  console.log("Chemin du fichier à supprimer:", filepath);

  fs.unlink(filepath, (err) => {
    if (err) {
      console.error("Erreur lors de la suppression du fichier:", err);
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
  deleteFile,
};
