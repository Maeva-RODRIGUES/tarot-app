// authControllers.test.js

require('dotenv').config({ path: '../../.env' });
const request = require('supertest');
const app = require('../../server'); // Assure-toi d'importer correctement ton application Express
const { User, Role, sequelize } = require('../../models/indexModels'); // Assure-toi que sequelize est bien importé ici
const bcrypt = require('bcrypt');

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

// Mock des données utilisateur
const testUser = {
  name: 'John',
  surname: 'Doe',
  email: 'testuser@example.com',
  password: 'Test@1234',
  birthday: '1990-01-01',
  city_of_birth: 'New York',
  time_of_birth: '12:00:00',
  role_id: 2 
};

beforeAll(async () => {
  const role = await Role.create({
    role_name: 'User'
  });

  const hashedPassword = await bcrypt.hash(testUser.password, 10);
  console.log('Mot de passe haché pour l\'utilisateur de test:', hashedPassword);

  await User.create({
    name: testUser.name,
    surname: testUser.surname,
    email: testUser.email,
    birthday: testUser.birthday,
    city_of_birth: testUser.city_of_birth,
    time_of_birth: testUser.time_of_birth,
    password: hashedPassword,
    id_Roles: role.id
  });
});


// Test de la fonction login
describe('Auth Controllers - Login', () => {
  
    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/api/tarot/auth/login')
        .send({ email: testUser.email, password: testUser.password });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('role');
    });
  
    it('should fail login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/tarot/auth/login')
        .send({ email: testUser.email, password: 'WrongPassword' });
      
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Identifiants incorrects');
    });
});

// Nettoyage après les tests
afterAll(async () => {
    await User.destroy({ where: { email: testUser.email } });
    await Role.destroy({ where: { role_name: 'User' } });
    await sequelize.close();
});