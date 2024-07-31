// drawingsController.js : logique métier des tirages de cartes

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

// Créer un tirage aléatoire de 3 cartes basé sur le thème choisi
exports.createRandomDrawingByTheme = async (req, res) => {
    try {
        console.log('Corps de la requête :', req.body);

        const themeName = req.params.theme;
        console.log(`Recherche du thème : ${themeName}`);

        const theme = await Theme.findOne({ where: { title_theme: themeName } });
        if (!theme) {
            console.error(`Thème non trouvé : ${themeName}`);
            return res.status(400).json({ message: "Thème invalide" });
        }
        console.log(`Thème trouvé : ${theme.title_theme}`);

        // Tirer toutes les cartes disponibles
        const tarotDeck = await Card.findAll();
        console.log(`Nombre total de cartes disponibles : ${tarotDeck.length}`);

        // Mélanger le deck
        const shuffledDeck = shuffleArray(tarotDeck);

        // Sélectionner les 3 premières cartes après le mélange
        const randomCards = shuffledDeck.slice(0, 3);

        // Utiliser le champ 'meaning_theme' pour récupérer une interprétation aléatoire
        const interpretations = JSON.parse(theme.meaning_theme);
        const randomInterpretation = interpretations[Math.floor(Math.random() * interpretations.length)];

        // Vérifiez que req.user est défini
        if (!req.user) {
            return res.status(401).json({ message: 'Utilisateur non authentifié' });
        }

        // Créer le tirage en incluant l'interprétation dans le champ 'cards'
        const newDrawing = await Drawing.create({
            date: new Date(),
            cards: JSON.stringify({
                cards: randomCards,
                interpretation: randomInterpretation
            }),
            id_Themes: theme.id,
            id_Users: req.user.id
        });

        // Associer les cartes au tirage
        await newDrawing.addCards(randomCards);

        res.status(201).json({ 
            message: 'Tirage aléatoire créé avec succès', 
            drawing: newDrawing
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
