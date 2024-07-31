// themesControllers.js

const { Theme } = require('../models/indexModels');

const themesControllers = {
    // Récupérer tous les thèmes
    getAllThemes: async (req, res) => {
        try {
          const themes = await Theme.findAll({
            attributes: ['id', 'title_theme', 'meaning_theme'] // Sélection explicite des colonnes à retourner
          });
          res.status(200).json(themes);
        } catch (error) {
          res.status(500).json({ message: 'Erreur lors de la récupération des thèmes', error });
        }
      },

    // Récupérer un thème spécifique par son ID
    getThemeById: async (req, res) => {
        const id = req.params.id;
        try {
            const theme = await Theme.findByPk(id);
            if (!theme) {
                return res.status(404).json({ message: 'Thème non trouvé' });
            }
            res.status(200).json(theme);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération du thème', error });
        }
    },

    // Créer un nouveau thème
    createTheme: async (req, res) => {
        try {
            const newTheme = await Theme.create(req.body);
            res.status(201).json(newTheme);
        } catch (error) {
            res.status(400).json({ message: 'Erreur lors de la création du thème', error });
        }
    },

    // Mettre à jour un thème par son ID
    updateTheme: async (req, res) => {
        // Récupère l'ID du thème à mettre à jour à partir des paramètres de la requête
        const id = req.params.id;
    
        try {
            // Effectue la mise à jour du thème dans la base de données
            const updatedCount = await Theme.update(req.body, {
                where: { id: id }, // Condition de mise à jour basée sur l'ID
            });
    
            // Vérifie si au moins un enregistrement a été mis à jour
            if (updatedCount[0] > 0) {
                // Si oui, récupère le thème mis à jour à partir de la base de données
                const updatedTheme = await Theme.findOne({ where: { id: id } });
                // Renvoie une réponse JSON avec le message de succès et le thème mis à jour
                res.json({ message: 'Thème mis à jour avec succès', updatedTheme });
            } else {
                // Si aucun enregistrement n'a été mis à jour, renvoie une erreur 404
                res.status(404).send('Thème non trouvé ou pas de changement effectué');
            }
        } catch (error) {
            // En cas d'erreur lors de la mise à jour du thème, log l'erreur et renvoie une réponse d'erreur 500
            console.error('Erreur lors de la mise à jour du thème :', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour du thème', error });
        }
    },

    // Supprimer un thème par son ID
    deleteTheme: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedCount = await Theme.destroy({
                where: { id: id }
            });
            if (deletedCount > 0) {
                res.json({ message: 'Thème supprimé avec succès' });
            } else {
                res.status(404).send('Thème non trouvé');
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du thème', error });
        }
    }
};

module.exports = themesControllers;
