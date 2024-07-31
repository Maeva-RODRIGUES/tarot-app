// multerConfig.js

const multer = require('multer');
const path = require('path'); 

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

// Initialisation de Multer avec les configurations définies
const upload = multer({
  storage: multer.memoryStorage(), // Utiliser multer.memoryStorage() au lieu de multer.diskStorage()
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de taille de fichier à 5MB
  fileFilter: fileFilter
});

module.exports = upload;
