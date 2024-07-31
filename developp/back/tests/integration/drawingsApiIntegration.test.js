// Fichier de test d'intégration pour les routes de l'API avec un échantillon de données fictives.
// drawingsApiIntegration.test.js

const request = require('supertest');
const app = require('../../server');
const { Sequelize } = require('sequelize');
const dbConfig = require('../../config/connexionDatabase');


describe('Test des routes de DrawingsRoutes.js', () => {
  let sequelize;
  let drawingId; // Variable pour stocker l'ID du tirage créé

  beforeAll(async () => {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      port: dbConfig.port
    });

    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      await sequelize.sync({ force: false }); // Change to { force: false } to avoid deleting data
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  afterAll(async () => {
    // Nettoyage: Supprimez le tirage créé pendant les tests
    if (drawingId) {
      await sequelize.query(`DELETE FROM Drawings WHERE id = ${drawingId}`);
    }
    await sequelize.close();
  });

   // Test POST pour créer un tirage
  test('POST /api/tarot/draw should create a new drawing', async () => {
    const res = await request(app)
      .post('/api/tarot/draw')
      .send({
        date: "2023-04-06T14:00:00Z",
        cards: "1,2,3",
        id_Themes: 1,
        id_Users: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id'); // Vérifiez que l'ID est présent
    drawingId = res.body.id; // Stockez l'ID pour les tests suivants

    console.log(drawingId); 
  });
  

  // Test GET pour récupérer un tirage de tarot
  test('GET /api/tarot/draw', async () => {
    const response = await request(app).get('/api/tarot/draw');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('cards');
  });

  // Test GET pour récupérer un tirage de tarot aléatoire
  test('GET /api/tarot/draw-random', async () => {
    const response = await request(app).get('/api/tarot/draw-random');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('card');
  });

  // Test GET pour récupérer un tirage de tarot en fonction du thème choisi
  test('GET /api/tarot/draw-theme/:theme', async () => {
    const theme = 'Amour';
    const response = await request(app).get(`/api/tarot/draw-theme/${theme}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('cards');
  });

  // Test PUT pour mettre à jour un tirage
  test('PUT /api/tarot/draw/:id should update the drawing', async () => {
    const res = await request(app)
      .put(`/api/tarot/draw/${drawingId}`)
      .send({
        date: "2023-04-07T14:00:00Z",
        cards: "4,5,6"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Tirage mis à jour avec succès');
  });

  // Test DELETE pour supprimer un tirage
  test('DELETE /api/tarot/draw/:id should delete the drawing', async () => {
    const res = await request(app).delete(`/api/tarot/draw/${drawingId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Tirage supprimé avec succès');
  });
});

