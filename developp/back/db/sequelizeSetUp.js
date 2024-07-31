// Ce fichier utilise les informations de connexionDatabase.js pour configurer et initialiser Sequelize.
//sequelizeSetUp.js

// Authentification à la base de données
const { sequelize } = require('../models/indexModels'); // Importer sequelize depuis indexModels

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
