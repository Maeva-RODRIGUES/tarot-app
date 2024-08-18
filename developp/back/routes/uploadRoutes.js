// uploadRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const uploadController  = require('../controllers/uploadControllers');
const { uploadAvatar, getAvatar } = uploadController;

// Route pour télécharger un fichier
router.post('/', upload.single('image'), uploadController.uploadFile);

// Route pour lister tous les fichiers
router.get('/files', uploadController.listFiles);

// Route pour récupérer un fichier spécifique
router.get('/files/:filename', uploadController.getFile);

// Route pour mettre à jour un fichier existant (patch)
router.patch('/:filename', upload.single('image'), uploadController.updateFile);

// Route pour supprimer un fichier
router.delete('/files/:filename', uploadController.deleteFile);

//-------------------------------------------------------------------
// Section avatar
//-------------------------------------------------------------------

// Route pour télécharger ou mettre à jour l'avatar d'un utilisateur
router.post('/avatar', upload.single('avatar'), uploadAvatar);

// Route pour récupérer l'avatar d'un utilisateur
router.get('/:userId/avatar', getAvatar);



module.exports = router;
