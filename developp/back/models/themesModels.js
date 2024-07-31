// Ce fichier définit le modèle Theme, qui représente les différents thèmes de tirage de tarot (comme Amour, Carrière et Spiritualité).
// Utilité: Permet de gérer les informations des thèmes de tirage de tarot dans la base de données.
// themesModels.js

module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('Theme', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title_theme: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meaning_theme: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    // Définir les options du modèle
    timestamps: false, // Désactiver les timestamps (createdAt et updatedAt)
    underscored: true, // Utiliser la convention underscored pour les noms de colonnes
    tableName: 'Themes' // Nom de la table dans la base de données (si différent du nom du modèle)
  });

  return Theme;
  
};
