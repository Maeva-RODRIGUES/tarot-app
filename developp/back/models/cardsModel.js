// Ce fichier définit le modèle "Cards", qui représente les cartes de tarot dans la base de données. Il utilise Sequelize pour définir la structure des données et les contraintes associées.
// Utilité: Permet de gérer les informations des cartes de tarot dans la base de données.
// cardsModels.js

module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_card: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keyword1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keyword2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keyword3: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  return Card;
};

