// users-seeders.js

'use strict';

const generateUsers = require('../Mock/usersMock');
const { Role } = require('../../models/indexModels');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      // Récupérer les rôles existants depuis la base de données
      const adminRole = await Role.findOne({ where: { role_name: 'Admin' } });
      const userRole = await Role.findOne({ where: { role_name: 'User' } });

      if (!adminRole || !userRole) {
          throw new Error('Les rôles Admin et User doivent être migrés avant les utilisateurs.');
      }

      const users = await generateUsers(10); // Génère 10 utilisateurs fictifs

      // Insérer les utilisateurs dans la base de données
      await queryInterface.bulkInsert('Users', users.map(user => ({
          name: user.name,
          surname: user.surname,
          email: user.email,
          birthday: user.birthday,
          city_of_birth: user.city_of_birth,
          time_of_birth: user.time_of_birth,
          password: user.password,
          id_Roles: user.id_Roles === 'Admin' ? adminRole.id : userRole.id, // Utiliser l'ID du rôle existant
          createdAt: new Date(),
          updatedAt: new Date()
      })), {});
  },

  down: async (queryInterface, Sequelize) => {
      // Supprimer tous les utilisateurs lors de la réversion
      await queryInterface.bulkDelete('Users', null, {});
  }
};
