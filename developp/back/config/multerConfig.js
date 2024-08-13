// multerConfig.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Définir le chemin du sous-dossier
const uploadPath = 'uploads/tarot/';

// Vérification de l'existence du sous-dossier 'uploads/tarot/' avant de télécharger un fichier
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // Crée également tous les sous-répertoires manquants
}

// Filtrage des fichiers pour n'accepter que les images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!'); // Rejeter les fichiers non-images
  }
};

// Configuration du stockage sur le disque
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Utiliser le sous-dossier 'uploads/tarot/'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nom unique pour chaque fichier
  }
});

// Initialisation de Multer avec les configurations définies
const upload = multer({
  storage: storage, // Utiliser le stockage sur disque avec sous-dossier
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de taille de fichier à 5MB
  fileFilter: fileFilter
});

module.exports = upload;

