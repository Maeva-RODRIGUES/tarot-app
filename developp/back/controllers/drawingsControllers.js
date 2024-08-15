// drawingsController.js : logique métier des tirages de cartes
console.log("drawingsController.js is loaded");



const { Drawing, Card, Theme } = require('../models/indexModels');

// Fonction pour mélanger un tableau (algorithme Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Récupérer tous les tirages de tarot
exports.getAllDrawings = async (req, res) => {
    try {
        const drawings = await Drawing.findAll();
        res.json(drawings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tirages de tarot', error });
    }
};

// Récupérer tous les tirages de tarot pour un utilisateur spécifique
exports.getDrawingsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const drawings = await Drawing.findAll({
            where: { id_Users: userId },
            include: [
                {
                    model: Card,
                    through: { attributes: [] }, // Inclure les cartes associées
                    attributes: ['id', 'name_card', 'keyword1', 'keyword2', 'keyword3', 'image_url']
                },
                {
                    model: Theme,
                    attributes: ['id', 'title_theme'], // Pas besoin de `meaning_theme` ici
                }
            ],
            attributes: ['id', 'date', 'selected_interpretation'] // Inclure `selected_interpretation`
        });

        if (!drawings.length) {
            return res.status(404).json({ message: "Aucun tirage trouvé pour cet utilisateur" });
        }
        res.json(drawings);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tirages de tarot', error });
    }
};


// Récupérer le dernier tirage de tarot pour un utilisateur spécifique
exports.getLastDrawingForUser = async (req, res) => {
    console.log("getLastDrawingForUser called");
    try {
        const userId = req.params.userId;
        console.log(`Fetching last drawing for user ID: ${userId}`);
        const lastDrawing = await Drawing.findOne({
            where: { id_Users: userId },
            order: [['date', 'DESC']], // Trier par date décroissante pour obtenir le dernier tirage
            include: [
                {
                    model: Card,
                    attributes: ['id', 'name_card', 'image_url'],
                    through: { attributes: [] } // Ne pas inclure d'attributs supplémentaires de la table de jointure
                },
            ],
        });

        if (!lastDrawing) {
            console.log(`No drawing found for user ID: ${userId}`);
            return res.status(404).json({ message: "Aucun tirage trouvé pour cet utilisateur" });
        }

        res.json(lastDrawing);
    } catch (error) {
        console.error('Erreur lors de la récupération du dernier tirage de tarot:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du dernier tirage de tarot', error });
    }
};

// Créer un tirage pour un utilisateur spécifique basé sur le thème choisi
exports.createDrawingForUser = async (req, res) => {
    try {
        const { userId, theme } = req.params;

        // Récupérer le thème à partir de l'ID
        const themeData = await Theme.findOne({ where: { id: theme } });
        if (!themeData) {
            return res.status(400).json({ message: "Thème invalide" });
        }

        // Récupérer les cartes disponibles et mélanger
        const tarotDeck = await Card.findAll();
        const shuffledDeck = shuffleArray(tarotDeck);

        // Sélectionner les 3 premières cartes après le mélange
        const selectedCards = shuffledDeck.slice(0, 3);

        // Sélectionner une interprétation aléatoire
        const interpretations = JSON.parse(themeData.meaning_theme);
        const selectedInterpretation = interpretations[Math.floor(Math.random() * interpretations.length)];

        // Créer un nouveau tirage
        const newDrawing = await Drawing.create({
            date: new Date(),
            id_Themes: themeData.id,
            id_Users: userId,
            selected_interpretation: selectedInterpretation // Enregistrer l'interprétation sélectionnée
        });

        // Associer les cartes au tirage via la table de jointure
        await newDrawing.addCards(selectedCards);

        res.status(201).json({
            message: 'Tirage créé avec succès pour l\'utilisateur',
            drawing: newDrawing
        });
    } catch (error) {
        console.error('Erreur lors de la création du tirage :', error);
        res.status(500).json({ message: 'Erreur lors de la création du tirage', error });
    }
};


// Créer un tirage aléatoire de 3 cartes basé sur le thème choisi
exports.createRandomDrawingByTheme = async (req, res) => {
    try {
        const themeName = req.params.theme;

        const theme = await Theme.findOne({ where: { title_theme: themeName } });
        if (!theme) {
            return res.status(400).json({ message: "Thème invalide" });
        }

        // Tirer toutes les cartes disponibles et mélanger
        const tarotDeck = await Card.findAll();
        const shuffledDeck = shuffleArray(tarotDeck);

        // Sélectionner les 3 premières cartes après le mélange
        const randomCards = shuffledDeck.slice(0, 3);

        if (!req.user) {
            return res.status(401).json({ message: 'Utilisateur non authentifié' });
        }

        // Créer un nouveau tirage
        const newDrawing = await Drawing.create({
            date: new Date(),
            id_Themes: theme.id,
            id_Users: req.user.id,
        });

        // Associer les cartes au tirage via la table de jointure
        await newDrawing.addCards(randomCards);

        res.status(201).json({
            message: 'Tirage aléatoire créé avec succès',
            drawing: newDrawing,
        });
    } catch (error) {
        console.error('Erreur lors de la création du tirage aléatoire :', error);
        res.status(500).json({ message: 'Erreur lors de la création du tirage aléatoire', error });
    }
};

// Supprimer un tirage spécifique par son ID
exports.deleteDrawingById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedDrawing = await Drawing.destroy({
            where: { id: id }
        });
        if (deletedDrawing) {
            res.json({ message: 'Tirage supprimé avec succès' });
        } else {
            res.status(404).send('Tirage non trouvé');
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du tirage', error });
    }
};

module.exports.shuffleArray = shuffleArray;


