// Importation des bibliothèques :
const faker = require('faker'); // Faker est utilisé pour générer des données fictives.
const bcrypt = require('bcrypt'); // Bcrypt est utilisé pour hacher les mots de passe.

// Fonction pour formater les dates au format yyyy-MM-dd
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Définition d'une fonction asynchrone pour générer un tableau d'utilisateurs fictifs
const generateUsers = async (numberOfUsers) => {
  const users = []; // Initialisation d'un tableau vide pour stocker les utilisateurs générés.

  // Boucle pour générer le nombre spécifié d'utilisateurs
  for (let i = 0; i < numberOfUsers; i++) {
    // Génération d'un mot de passe aléatoire
    const password = faker.internet.password();
    // Hachage du mot de passe généré avec bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un objet utilisateur avec des données fictives générées par faker
    const user = {
      name: faker.name.firstName(), // Prénom fictif
      surname: faker.name.lastName(), // Nom de famille fictif
      email: faker.internet.email(), // Email fictif
      birthday: formatDate(faker.date.past(30, new Date('2000-01-01'))), // Date de naissance fictive formatée
      city_of_birth: faker.address.city(), // Ville de naissance fictive
      // Heure de naissance fictive, formatée en HH:MM
      time_of_birth: `${faker.datatype.number({ min: 0, max: 23 }).toString().padStart(2, '0')}:${faker.datatype.number({ min: 0, max: 59 }).toString().padStart(2, '0')}`,
      password: hashedPassword, // Mot de passe haché
      id_Roles: faker.datatype.number({ min: 1, max: 5 }) // ID de rôle fictif
    };

    // Ajout de l'utilisateur généré au tableau des utilisateurs
    users.push(user);
  }

  // Retour du tableau complet des utilisateurs générés
  return users;
};

// Exportation de la fonction generateUsers pour une utilisation dans d'autres fichiers
module.exports = generateUsers;




