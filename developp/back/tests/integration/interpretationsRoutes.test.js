// interpretationsRoutes.test.js

const request = require('supertest');
const app = require('../../server');

describe('Tests pour les routes des interprétations', () => {
    let interpretationId;
  
    it('GET /interpretations renvoie toutes les interprétations', async () => {
      const response = await request(app).get('/interpretations');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  
    it('POST /interpretations crée une nouvelle interprétation', async () => {
      const newInterpretation = {
        meaning: 'Nouveau départ, aventure, insouciance.',
        id_Themes: 1 // Assurez-vous que ce thème existe dans votre base de données
      };
      const response = await request(app).post('/interpretations').send(newInterpretation);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      interpretationId = response.body.id;
    });
  
    it('GET /interpretations/:id renvoie une interprétation spécifique', async () => {
      const response = await request(app).get(`/interpretations/${interpretationId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', interpretationId);
    });
  
    it('PUT /interpretations/:id met à jour une interprétation', async () => {
      const updatedInterpretation = {
        meaning: 'Changement de perspective, nouvelles opportunités.'
      };
      const response = await request(app).put(`/interpretations/${interpretationId}`).send(updatedInterpretation);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('meaning', 'Changement de perspective, nouvelles opportunités.');
    });
  
    it('DELETE /interpretations/:id supprime une interprétation', async () => {
      const response = await request(app).delete(`/interpretations/${interpretationId}`);
      expect(response.statusCode).toBe(204);
    });
  });
  