// hookbeforeCreate.test.js

require('dotenv').config({ path: '../../.env'});
const { sequelize, User } = require('../../models/indexModels');
const bcrypt = require('bcrypt');

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true }); // Synchroniser les modèles avec la base de données avant les tests
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Failed to synchronize the database:', error);
  }
});

describe('User Model Hooks', () => {
  it('should hash the password before saving the user', async () => {
    const userData = {
      name: 'John',
      surname: 'Doe',
      email: 'testuser@example.com',
      birthday: '1990-01-01',
      city_of_birth: 'Paris',
      time_of_birth: '12:00:00',
      password: 'Test@1234',
    };

    try {
      const user = await User.create(userData);
      expect(user.password).not.toBe(userData.password); // Vérifiez que le mot de passe a été haché
      const isMatch = await bcrypt.compare('Test@1234', user.password); // Comparez le mot de passe en clair avec le mot de passe haché
      expect(isMatch).toBe(true); // Assurez-vous que les mots de passe correspondent
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  });
});