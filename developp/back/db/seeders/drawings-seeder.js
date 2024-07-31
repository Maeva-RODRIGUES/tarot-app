// Ce script sélectionne aléatoirement un thème parmi les trois disponibles et trois cartes parmi les cartes disponibles pour créer un tirage. Il répète ce processus 10 fois pour générer 10 tirages aléatoires. Les données générées sont ensuite insérées dans la table Drawings à l’aide de queryInterface.bulkInsert.
// drawings-seedersjs

'use strict';

const faker = require('faker');
const themesMock = require('../themesMock'); 
const cardsMock = require('../cardsMock'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const drawingsData = [];
    for (let i = 0; i < 10; i++) {
      // Sélectionne un thème aléatoire parmi les thèmes disponibles
      const theme = themesMock[faker.datatype.number({ min: 0, max: themesMock.length - 1 })];
      // Sélectionne 3 cartes aléatoires parmi les cartes disponibles
      const selectedCards = faker.helpers.shuffle(cardsMock).slice(0, 3).map(card => card.name_card).join(', ');

      const drawing = {
        date: new Date(),
        cards: selectedCards,
        id_Themes: theme.id,
        id_Users: faker.datatype.number({ min: 1, max: 10 }), // pour 10 utilisateurs 
        createdAt: new Date(),
        updatedAt: new Date()
      };
      drawingsData.push(drawing);
    }
    await queryInterface.bulkInsert('Drawings', drawingsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Drawings', null, {});
  }
};
