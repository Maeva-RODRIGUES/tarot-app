// reviewsRoutes.test.js

const request = require('supertest');
const app = require('../../server');

describe('Tests pour les routes des avis', () => {
    let reviewId;
  
    it('GET /reviews renvoie tous les avis', async () => {
      const response = await request(app).get('/reviews');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  
    it('POST /reviews crée un nouvel avis', async () => {
      const newReview = {
        rating: 5,
        comment: 'Ce produit a dépassé mes attentes.',
        date: new Date(),
        id_Users: 1 // Assurez-vous que cet utilisateur existe dans votre base de données
      };
      const response = await request(app).post('/reviews').send(newReview);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      reviewId = response.body.id;
    });
  
    it('GET /reviews/:id renvoie un avis spécifique', async () => {
      const response = await request(app).get(`/reviews/${reviewId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', reviewId);
    });
  
    it('PUT /reviews/:id met à jour un avis', async () => {
      const updatedReview = {
        rating: 4,
        comment: 'Je suis satisfait de mon achat.'
      };
      const response = await request(app).put(`/reviews/${reviewId}`).send(updatedReview);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('rating', 4);
    });
  
    it('DELETE /reviews/:id supprime un avis', async () => {
      const response = await request(app).delete(`/reviews/${reviewId}`);
      expect(response.statusCode).toBe(204);
    });
  });
  



