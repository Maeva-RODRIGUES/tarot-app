//roles-seeder.js

'use strict'; 

// Exporte un objet qui définit deux méthodes : 'up' et 'down'
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Roles', [
          { role_name: 'Admin' },
          { role_name: 'User' }
          // Ajoutez d'autres rôles si nécessaire
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Roles', null, {});
  }
};
