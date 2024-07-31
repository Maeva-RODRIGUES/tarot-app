// themesRoutes.test.js

const request = require('supertest');
const app = require('../../server');

describe('Tests pour les routes des thèmes', () => {
    let themeId;
  
    it('GET /themes renvoie tous les thèmes', async () => {
      const response = await request(app).get('/themes');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  
    it('POST /themes crée un nouveau thème', async () => {
      const newTheme = {
        title_theme: 'Amour',
        meaning_theme: 'Thème lié aux relations et sentiments.'
      };
      const response = await request(app).post('/themes').send(newTheme);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      themeId = response.body.id;
    });
  
    it('GET /themes/:id renvoie un thème spécifique', async () => {
      const response = await request(app).get(`/themes/${themeId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', themeId);
    });
  
    it('PUT /themes/:id met à jour un thème', async () => {
      const updatedTheme = {
        title_theme: 'Carrière',
        meaning_theme: 'Thème lié au travail et à la réussite professionnelle.'
      };
      const response = await request(app).put(`/themes/${themeId}`).send(updatedTheme);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('title_theme', 'Carrière');
    });
  
    it('DELETE /themes/:id supprime un thème', async () => {
      const response = await request(app).delete(`/themes/${themeId}`);
      expect(response.statusCode).toBe(204);
    });
  });