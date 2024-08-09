// reviewsControllers.js

const { Review } = require('../models/indexModels');

const reviewsControllers = {
    // Récupérer tous les avis
    getAllReviews: async (req, res) => {
        console.log("Requête reçue pour récupérer tous les avis");
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
        console.log(`Requête reçue pour récupérer l'avis avec l'ID: ${id}`);
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

    // Récupérer tous les avis d'un utilisateur spécifique
    getReviewsByUser: async (req, res) => {
        const userId = req.params.userId;
        console.log(`Requête reçue pour récupérer les avis de l'utilisateur avec l'ID: ${userId}`);
        try {
            const reviews = await Review.findAll({ where: { id_Users: userId } });
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des avis de l\'utilisateur', error });
        }
    },

    // Créer un avis pour un utilisateur spécifique
createReviewForUser: async (req, res) => {
    const { userId } = req.params;
    const { rating, comment, date } = req.body;
  
    if (!rating || !comment || !date) {
      return res.status(400).json({ message: "Les champs rating, comment et date sont obligatoires." });
    }
  
    try {
      const newReview = await Review.create({
        rating,
        comment,
        date,
        id_Users: userId,
      });
      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la création de l'avis", error });
    }
  },
  
    // Créer un nouvel avis
    createReview: async (req, res) => {
        console.log("Requête reçue pour créer un nouvel avis :", req.body);
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
        console.log(`Requête reçue pour mettre à jour l'avis avec l'ID: ${id}`);
        try {
            const updatedCount = await Review.update(req.body, {
                where: { id: id },
            });

            if (updatedCount[0] > 0) {
                const updatedReview = await Review.findOne({ where: { id: id } });
                res.json({ message: 'Avis mis à jour avec succès', updatedReview });
            } else {
                res.status(404).send('Avis non trouvé ou pas de changement effectué');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'avis :', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'avis', error });
        }
    },

    // Supprimer un avis par son ID
    deleteReview: async (req, res) => {
        const id = req.params.id;
        console.log(`Requête reçue pour supprimer l'avis avec l'ID: ${id}`);
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

