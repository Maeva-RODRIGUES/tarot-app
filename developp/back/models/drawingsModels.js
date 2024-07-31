// Ce fichier définit le modèle "Drawing"
// drawingsModels.js

module.exports = (sequelize, DataTypes) => {
  const Drawing = sequelize.define('Drawing', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cards: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_Themes: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Themes',
        key: 'id'
      }
    },
    id_Users: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: false
  });

  return Drawing;
};
