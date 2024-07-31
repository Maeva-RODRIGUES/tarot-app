//Fichier de tests pour les routes qui gèrent les données des cartes de tarot, Ces tests vérifient si les routes renvoient les bonnes données et si les erreurs sont correctement gérées. 
// cardsRoutes.test.js

const request = require('supertest');
const app = require('../../server');


describe('Tests des routes du tarot', () => {
    it('GET /api/tarot/cards renvoie toutes les cartes', async () => {
        const response = await request(app).get('/api/tarot/cards');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(22); 
    });

    it('GET /api/tarot/cards/1 renvoie la carte "Le Magicien"', async () => {
        const response = await request(app).get('/api/tarot/cards/1');
        expect(response.status).toBe(200);
        expect(response.body.name_card).toBe('Le Magicien'); 
    });

    it('GET /api/tarot/cards/100 renvoie une erreur 404', async () => {
        const response = await request(app).get('/api/tarot/cards/100');
        expect(response.status).toBe(404);
    });
});