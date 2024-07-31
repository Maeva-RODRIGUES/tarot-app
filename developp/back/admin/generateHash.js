// generateHash.js : générer le hash du mot de passe administrateur

const bcrypt = require('bcrypt');

const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(`Hash for password '${password}': ${hash}`);
};

generateHash('password10'); // Remplacer 'password10' par le mot de passe à hasher
