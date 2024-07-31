// Ce fichier définit le modèle Role, qui représente les différents rôles des utilisateurs (comme admin, utilisateur standard).
// Utilité: Permet de gérer les rôles des utilisateurs dans la base de données.
// rolesModels.js

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });


// Définir l'association entre Role et User
Role.associate = function(models) {
  Role.hasMany(models.User, { foreignKey: 'id_Roles', as: 'users' });
};

return Role;


};


