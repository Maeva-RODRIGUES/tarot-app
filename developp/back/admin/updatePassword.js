// updatePassword.js : Mise à jour des mdp dans bdd php myadmin

require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../models/indexModels'); 

const updatePasswords = async () => {
    try {
      await sequelize.authenticate();
      const users = await User.findAll();
      for (const user of users) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        await user.save();
      }
      console.log('Passwords updated successfully.');
    } catch (error) {
      console.error('Error hashing passwords:', error);
    } finally {
      await sequelize.close();
    }
  };
  
  updatePasswords();