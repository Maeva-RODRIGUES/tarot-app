const bcrypt = require('bcrypt');

const testPassword = async () => {
  const password = 'testmotdepasse1234'; // Mot de passe en clair que vous voulez tester
  const hashedPassword = '$2b$10$6GtkpOLpVdZRt.YKtV3FNeVnIFt70hnalNJgnAJZWw1Slmcd3tk12'; // Hachage extrait de la base de données

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('Le mot de passe correspond-il ?', isMatch); // Doit afficher 'true' si le mot de passe correspond
};

testPassword();
