// reviews-seeder.js

'use strict';

// Importation de la bibliothèque faker pour générer des données fictives
const faker = require('faker');

module.exports = {
  // La fonction 'up' est exécutée lorsque le seeder est lancé
  up: async (queryInterface, Sequelize) => {
    // Liste des ID utilisateurs existants dans la base de données
    const existingUserIds = [1,2,3,4,5,6,7,8,9,10];
    // Tableau pour stocker les données des avis à insérer
    const reviewsData = [];

    // Boucle sur chaque ID utilisateur pour créer un avis
    for (const userId of existingUserIds) {
      // Vérifie si l'utilisateur a déjà un avis dans la table 'Reviews'
      const existingReview = await queryInterface.rawSelect('Reviews', {
        where: { id_Users: userId },
      }, ['id']);

      // Si l'utilisateur n'a pas d'avis, crées-en un
      if (!existingReview) {
        // Création d'un objet 'review' avec des données fictives
        const review = {
          rating: faker.datatype.number({ min: 1, max: 5 }), // Note aléatoire entre 1 et 5
          comment: faker.lorem.sentences(), // Commentaire fictif
          date: new Date(), // Date actuelle pour l'avis
          id_Users: userId, // ID de l'utilisateur pour l'avis
          createdAt: new Date(), // Date actuelle pour 'createdAt'
          updatedAt: new Date() // Date actuelle pour 'updatedAt'
        };
        // Ajout de l'avis au tableau 'reviewsData'
        reviewsData.push(review);
      }
    }

    // Insertion des avis dans la table 'Reviews'
    await queryInterface.bulkInsert('Reviews', reviewsData, {});
  },

  // La fonction 'down' est exécutée pour annuler le seeder
  down: async (queryInterface, Sequelize) => {
    // Suppression de tous les avis de la table 'Reviews'
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};



