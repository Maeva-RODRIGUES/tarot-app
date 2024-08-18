// multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//-------------------------------------------------------------------
// Définition des chemins des sous-dossiers
//-------------------------------------------------------------------
const tarotUploadPath = 'uploads/tarot/';
const avatarUploadPath = 'uploads/avatars/';

//-------------------------------------------------------------------
// Vérification de l'existence des sous-dossiers avant de télécharger un fichier
//-------------------------------------------------------------------
// Vérifie si le dossier 'uploads/tarot/' existe, sinon il le crée
if (!fs.existsSync(tarotUploadPath)) {
  fs.mkdirSync(tarotUploadPath, { recursive: true }); // Crée également tous les sous-répertoires manquants
}

// Vérifie si le dossier 'uploads/avatars/' existe, sinon il le crée
if (!fs.existsSync(avatarUploadPath)) {
  fs.mkdirSync(avatarUploadPath, { recursive: true }); // Crée également tous les sous-répertoires manquants
}

//-------------------------------------------------------------------
// Filtrage des fichiers pour n'accepter que les images
//-------------------------------------------------------------------
// Fonction de filtrage des fichiers acceptant uniquement les types d'images spécifiés
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/; // Types d'images autorisés
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accepte le fichier
  } else {
    cb('Error: Images Only!'); // Rejette les fichiers non-images
  }
};

//-------------------------------------------------------------------
// Configuration du stockage sur le disque
//-------------------------------------------------------------------
// Configuration du stockage avec des conditions dynamiques pour les avatars et les images de tarot
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = tarotUploadPath; // Par défaut, utiliser le sous-dossier 'uploads/tarot/'

    // Si le champ du fichier est 'avatar', changer le chemin vers 'uploads/avatars/'
    if (file.fieldname === 'avatar') {
      uploadPath = avatarUploadPath;
    }

    cb(null, uploadPath); // Utiliser le chemin déterminé
  },
  filename: (req, file, cb) => {
    // Générer un nom unique pour chaque fichier en utilisant l'heure actuelle
    cb(null, Date.now() + '-' + file.originalname);
  }
});

//-------------------------------------------------------------------
// Initialisation de Multer avec les configurations définies
//-------------------------------------------------------------------
// Configuration de multer avec les options définies: stockage, limite de taille et filtrage des fichiers
const upload = multer({
  storage: storage, // Utiliser le stockage sur disque avec sous-dossiers
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de taille de fichier à 5MB
  fileFilter: fileFilter // Appliquer le filtre de fichiers pour les images
});

module.exports = upload;

