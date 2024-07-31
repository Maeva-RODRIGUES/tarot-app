// themes-seeder.js

'use strict';

const themes = require('../themesMock');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Map through themesData to create an array of objects for bulkInsert
    const themesToInsert = themes.map(theme => ({
      title_theme: theme.title_theme,
      meaning_theme: JSON.stringify(theme.meaning_theme), // Convert the array to a string
    }));

    await queryInterface.bulkInsert('Themes', themesToInsert, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Themes', null, {});
  }
};
