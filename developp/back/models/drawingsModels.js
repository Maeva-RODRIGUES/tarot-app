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
    },
    selected_interpretation: { // Ajout de la nouvelle colonne
      type: DataTypes.TEXT,
      allowNull: true, // Peut être null si l'interprétation n'est pas toujours obligatoire
    }
  }, {
    timestamps: false
  });

  return Drawing;
};
