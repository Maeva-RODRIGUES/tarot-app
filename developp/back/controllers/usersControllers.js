// usersControllers.js

const bcrypt = require('bcrypt');
const { User, Role, Drawing } = require('../models/indexModels');

// ------------------------------------------------------------
// Fonction pour formater les dates au format yyyy-MM-dd
// ------------------------------------------------------------
const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
};

// ------------------------------------------------------------
// Fonction pour convertir les dates du format dd/MM/yyyy au format yyyy-MM-dd
// Cette fonction utilise la logique mise à jour pour gérer l'indexation zéro des mois en JavaScript
// ------------------------------------------------------------
const convertToDBFormat = (date) => {
    if (!date) return null;

    // Vérifier si la date est déjà dans le format 'yyyy-MM-dd'
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(date)) {
        return date; // La date est déjà dans un format valide
    }

    // Si la date n'est pas dans le format 'yyyy-MM-dd', on suppose qu'elle est en 'dd/MM/yyyy'
    const [day, month, year] = date.split('/');
    const formattedDate = new Date(year, month - 1, day); // Mois -1 pour compenser l'indexation zéro de JS

    if (isNaN(formattedDate.getTime())) { // Vérifie si la date est valide
        console.error('Date invalide détectée lors de la conversion:', date);
        return 'Invalid date';
    }

    return formatDate(formattedDate); // Retourne la date formatée
};

// ------------------------------------------------------------
// Contrôleur pour gérer les utilisateurs
// ------------------------------------------------------------
const usersControllers = {
    // ------------------------------------------------------------
    // Récupérer tous les utilisateurs
    // ------------------------------------------------------------
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                include: [
                    { model: Role, as: 'role' },
                    { model: Drawing, as: 'drawings', required: false } // Même si le tirage est vide, l'utilisateur sera toujours retourné.
                ]

            });

            // Formater les dates avant de renvoyer la réponse
            const formattedUsers = users.map(user => {
                const formattedUser = user.toJSON();
                formattedUser.birthday = formatDate(formattedUser.birthday);
                formattedUser.createdAt = formatDate(formattedUser.createdAt);
                formattedUser.updatedAt = formatDate(formattedUser.updatedAt);
                return formattedUser;
            });

            res.status(200).json(formattedUsers);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error); 
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
        }
    },

    // ------------------------------------------------------------
    // Récupérer un utilisateur par son ID
    // ------------------------------------------------------------
    getUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findByPk(id, {
                include: { model: Role, as: 'role' }
            });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            // Formater les dates avant de renvoyer la réponse
            const formattedUser = user.toJSON();
            formattedUser.birthday = formatDate(formattedUser.birthday);
            formattedUser.createdAt = formatDate(formattedUser.createdAt);
            formattedUser.updatedAt = formatDate(formattedUser.updatedAt);

            res.status(200).json(formattedUser);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
        }
    },

    // ------------------------------------------------------------
    // Créer un nouvel utilisateur
    // Cette méthode utilise la fonction convertToDBFormat pour s'assurer que la date est correctement formatée avant d'être stockée
    // ------------------------------------------------------------
    createUser: async (req, res) => {
        const { name, surname, email, birthday, city_of_birth, time_of_birth, password, role_id } = req.body;

        try {
            // Log avant la vérification de doublon
            console.log('Vérification de l\'existence d\'un utilisateur avec l\'email:', email);

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                console.log('Utilisateur avec cet email déjà existant:', existingUser);
                return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
            }

           // Vérifiez si le rôle existe avant la création
           const validRoleId = await Role.findByPk(role_id);
           if (!validRoleId) {
               console.log('Rôle spécifié n\'existe pas:', role_id);
               return res.status(400).json({ message: 'Le rôle spécifié n\'existe pas' });
           }

            // Créer l'utilisateur (le mot de passe sera hashé dans les hooks du modèle)
            const newUser = await User.create({
                name,
                surname,
                email,
                birthday: convertToDBFormat(birthday), // Conversion de la date avant stockage
                city_of_birth,
                time_of_birth,
                password, // Le mot de passe sera haché par les hooks
                id_Roles: role_id,
                avatar_url: "", // Initialiser avec une chaîne vide
            });

             // Log après la création de l'utilisateur
             console.log('Utilisateur créé:', newUser.toJSON());

            res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
        }
    },

    // ------------------------------------------------------------
    // Mettre à jour un utilisateur par son ID
    // Cette méthode vérifie si une date d'anniversaire est présente et la convertit au format correct avant la mise à jour
    // ------------------------------------------------------------
    updateUser: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).send('Utilisateur non trouvé');
            }

            const updatedData = { ...req.body };
        if (updatedData.birthday) {
            updatedData.birthday = convertToDBFormat(updatedData.birthday); // Conversion de la date avant mise à jour
            if (updatedData.birthday === 'Invalid date') {
                return res.status(400).json({ message: 'Date de naissance invalide fournie' });
            }
        }

            console.log('Données de mise à jour reçues :', updatedData);
            await user.update(updatedData);

            const updatedUser = await User.findByPk(id);

            res.json({ message: 'Utilisateur mis à jour avec succès', updatedUser });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
        }
    },

    // ------------------------------------------------------------
    // Supprimer un utilisateur par son ID
    // ------------------------------------------------------------
    deleteUser: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedCount = await User.destroy({
                where: { id: id }
            });
            if (deletedCount > 0) {
                res.json({ message: 'Utilisateur supprimé avec succès' });
            } else {
                res.status(404).send('Utilisateur non trouvé');
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
        }
    }
};

module.exports = usersControllers;


