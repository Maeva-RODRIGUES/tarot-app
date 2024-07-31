// reviewsControllers.js

const { Review } = require('../models/indexModels');

const reviewsControllers = {
    // Récupérer tous les avis
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.findAll();
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des avis', error });
        }
    },

    // Récupérer un avis spécifique par son ID
    getReviewById: async (req, res) => {
        const id = req.params.id;
        try {
            const review = await Review.findByPk(id);
            if (!review) {
                return res.status(404).json({ message: 'Avis non trouvé' });
            }
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération de l\'avis', error });
        }
    },

    // Créer un nouvel avis
    createReview: async (req, res) => {
        try {
            const newReview = await Review.create(req.body);
            res.status(201).json(newReview);
        } catch (error) {
            res.status(400).json({ message: 'Erreur lors de la création de l\'avis', error });
        }
    },

    // Mettre à jour un avis par son ID
    updateReview: async (req, res) => {
        const id = req.params.id;
    
        try {
            // Effectue la mise à jour de l'avis dans la base de données
            const updatedCount = await Review.update(req.body, {
                where: { id: id }, // Condition de mise à jour basée sur l'ID
            });
    
            // Vérifie si au moins un enregistrement a été mis à jour
            if (updatedCount[0] > 0) {
                // Si oui, récupère l'avis mis à jour à partir de la base de données
                const updatedReview = await Review.findOne({ where: { id: id } });
                // Renvoie une réponse JSON avec le message de succès et l'avis mis à jour
                res.json({ message: 'Avis mis à jour avec succès', updatedReview });
            } else {
                // Si aucun enregistrement n'a été mis à jour, renvoie une erreur 404
                res.status(404).send('Avis non trouvé ou pas de changement effectué');
            }
        } catch (error) {
            // En cas d'erreur lors de la mise à jour de l'avis, log l'erreur et renvoie une réponse d'erreur 500
            console.error('Erreur lors de la mise à jour de l\'avis :', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'avis', error });
        }
    },
    
    // Supprimer un avis par son ID
    deleteReview: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedCount = await Review.destroy({
                where: { id: id }
            });
            if (deletedCount > 0) {
                res.json({ message: 'Avis supprimé avec succès' });
            } else {
                res.status(404).send('Avis non trouvé');
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'avis', error });
        }
    }
};

module.exports = reviewsControllers;
