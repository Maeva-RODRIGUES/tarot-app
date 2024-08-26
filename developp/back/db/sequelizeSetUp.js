// Ce fichier utilise les informations de connexionDatabase.js pour configurer et initialiser Sequelize.
//sequelizeSetUp.js

require('dotenv').config({ path: '../.env' });

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);


// Authentification à la base de données
const { sequelize } = require('../models/indexModels'); // Importer sequelize depuis indexModels

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
