// Ce fichier définit le modèle User, qui représente les utilisateurs de l'application.
// Utilité: Permet de gérer les informations des utilisateurs dans la base de données.
// usersModels.js

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('birthday');
        return rawValue ? new Date(rawValue).toLocaleDateString('fr-FR') : null;
      }
    },
    city_of_birth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time_of_birth: {
      type: DataTypes.TIME,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: 'Le mot de passe doit contenir au moins 8 caractères'
        }
      }
    },
   
    id_Roles: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      }
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true, // Le champ avatar_url peut être null
    },
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    },
    // Surcharge de la méthode toJSON pour formater les dates
    instanceMethods: {
      toJSON: function () {
        const values = Object.assign({}, this.get());
        const formatDate = (date) => {
          if (!date) return null;
          const d = new Date(date);
          let day = d.getDate();
          let month = d.getMonth() + 1;
          const year = d.getFullYear();

          if (day < 10) day = '0' + day;
          if (month < 10) month = '0' + month;

          return `${day}/${month}/${year}`;
        };
        values.birthday = formatDate(values.birthday);
        values.createdAt = formatDate(values.createdAt);
        values.updatedAt = formatDate(values.updatedAt);
        return values;
      }
    }
  });

  User.associate = function(models) {
    User.belongsTo(models.Role, { foreignKey: 'id_Roles', as: 'role' });
  };

  return User;
};

