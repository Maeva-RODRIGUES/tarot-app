// test unitaire des fonctions de tirages
// drawingsBusinessLogic.test.js


// Importe les fonctions à tester depuis tarotController.js
const { drawCards, drawRandomCards, drawThemeCards } = require('../../controllers/drawingsControllers');

// Tests pour drawCards
test('drawCards renvoie un tirage de tarot avec trois cartes', () => {
    // Mock Express request et response objects
    const req = null;
    const res = {
        json: jest.fn()
    };

    // Appelle drawCards
    drawCards(req, res);

    // Vérifie si la réponse contient les clés attendues
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Tirage de tarot effectué avec succès',
        cards: expect.arrayContaining([
            expect.any(Object),
            expect.any(Object),
            expect.any(Object)
        ])
    }));
});

// Tests pour drawRandomCards
test('drawRandomCards renvoie un tirage de tarot aléatoire avec trois cartes', () => {
    // Mock Express request et response objects
    const req = { params: { theme: 'Amour' } }; // Simulation d'un thème 'Amour' pour le test
    const res = {
        json: jest.fn()
    };

    // Appeler la fonction drawRandomCards avec les objets request et response simulés
    drawRandomCards(req, res);

    // Vérifier si la fonction json du mock response a été appelée avec les bonnes données
    expect(res.json).toHaveBeenCalledWith({
        message: 'Tirage de tarot aléatoire effectué avec succès',
        cards: expect.any(Array), // On vérifie juste qu'il y a un tableau de cartes
        interpretation: expect.any(String)
    });
});


// Tests pour drawThemeCards
test('drawThemeCards renvoie un tirage de tarot pour un thème donné', () => {
    // Mock Express request et response objects
    const req = { params: { theme: 'Amour' } }; // Simulation d'un thème 'Amour' pour le test
    const res = {
        json: jest.fn()
    };

    // Appeler la fonction drawThemeCards avec les objets request et response simulés
    drawThemeCards(req, res);

    // Vérifier si la fonction json du mock response a été appelée avec les bonnes données
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Tirage de tarot pour le thème love effectué avec succès',
        cards: expect.arrayContaining([
            expect.objectContaining({
                name: expect.any(String),
                meaning: expect.any(String)
            }),
            expect.objectContaining({
                name: expect.any(String),
                meaning: expect.any(String)
            }),
            expect.objectContaining({
                name: expect.any(String),
                meaning: expect.any(String)
            })
        ])
    }));
});