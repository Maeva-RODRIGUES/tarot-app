// cardsController.js :  logique métier de la gestion des cartes

const { Card } = require('../models/indexModels');

// Fonction pour récupérer toutes les cartes du tarot
exports.getAllCards = async (req, res) => {
    try {
        const cards = await Card.findAll();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des cartes', error });
    }
};

// Fonction pour récupérer une carte spécifique par son ID
exports.getCardById = async (req, res) => {
    try {
        const id = req.params.id;
        const card = await Card.findByPk(id);
        if (card) {
            res.json(card);
        } else {
            res.status(404).send('Carte non trouvée');
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la carte', error });
    }
};

// Fonction pour créer une nouvelle carte
exports.createCard = async (req, res) => {
    try {
        const newCard = await Card.create({
            name_card: req.body.name_card,
            keyword1: req.body.keyword1,
            keyword2: req.body.keyword2,
            keyword3: req.body.keyword3,
            image_url: req.body.image_url,
        });
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la carte', error });
    }
};

// Fonction pour mettre à jour une carte spécifique par son ID
exports.updateCardById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCard = await Card.update(req.body, {
            where: { id: id }
        });

        if (updatedCard[0] === 1) {
            const updatedCardData = await Card.findByPk(id);
            res.json({ message: 'Carte mise à jour avec succès', updatedCard: updatedCardData });
        } else {
            res.status(404).send('Carte non trouvée ou pas de changement effectué');
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la carte', error });
    }
};

// Fonction pour supprimer une carte spécifique par son ID
exports.deleteCardById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCard = await Card.destroy({
            where: { id: id }
        });
        if (deletedCard) {
            res.json({ message: 'Carte supprimée avec succès' });
        } else {
            res.status(404).send('Carte non trouvée');
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la carte', error });
    }
};