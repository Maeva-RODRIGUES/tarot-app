// authRoutes.test.js

const request = require('supertest');
const app = require('../../server'); // Assurez-vous que ce chemin mène à votre fichier principal de l'application Express
const { sequelize, User } = require('../../models/indexModels');

beforeAll(async () => {
  // Synchronisez la base de données et créez un utilisateur de test
  await sequelize.sync({ force: true });

  await User.create({
    email: 'test@example.com',
    password: 'passwordtest' // Assurez-vous que le mot de passe est hashé si nécessaire
  });
});

afterAll(async () => {
  // Fermez la connexion à la base de données après tous les tests
  await sequelize.close();
});

describe('Auth Routes', () => {
  let token; // Variable pour stocker le jeton JWT

  describe('POST /api/tarot/auth/login', () => {
    it('devrait authentifier l\'utilisateur et renvoyer un jeton JWT', async () => {
      // Les identifiants de l'utilisateur pour le test
      const userCredentials = {
        email: 'jane.smith@example.com',
        password: 'password2'
      };

      // Faites une requête POST à la route de connexion
      const response = await request(app)
        .post('/api/tarot/auth/login')
        .send(userCredentials);

      // Vérifiez que la réponse a un statut 200 OK
      expect(response.statusCode).toBe(200);

      // Vérifiez que la réponse contient un jeton JWT
      expect(response.body).toHaveProperty('token');
      token = response.body.token; // Stockez le jeton JWT pour l'utiliser dans les tests suivants

      // Assurez-vous que le jeton est une chaîne non vide
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('devrait renvoyer une erreur 401 si les identifiants sont incorrects', async () => {
      // Identifiants incorrects pour le test
      const wrongCredentials = {
        email: 'wronguser@example.com',
        password: 'wrongpassword'
      };

      // Faites une requête POST à la route de connexion avec des identifiants incorrects
      const response = await request(app)
        .post('/api/tarot/auth/login')
        .send(wrongCredentials);

      // Vérifiez que la réponse a un statut 401 Unauthorized
      expect(response.statusCode).toBe(401);

      // Vérifiez que la réponse contient le message d'erreur approprié
      expect(response.body).toHaveProperty('message', 'Identifiants incorrects');
    });
  });
});