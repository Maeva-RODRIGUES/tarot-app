//verifConnect.js

const { Sequelize } = require('sequelize');
require('dotenv').config(); // Assurez-vous que dotenv est correctement configuré pour charger les variables d'environnement

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    port: process.env.DB_PORT || 3307, // Assurez-vous que le port est correct
    logging: false, // Désactive les logs SQL si nécessaire
    dialectOptions: {
      
    }
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close(); // Fermer la connexion après les tests
  }
}

testConnection();
