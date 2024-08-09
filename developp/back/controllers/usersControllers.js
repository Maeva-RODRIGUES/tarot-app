// usersControllers.js

const bcrypt = require('bcrypt');
const { User, Role } = require('../models/indexModels');

// Fonction pour formater les dates au format yyyy-MM-dd
const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
};

// Fonction pour convertir les dates du format dd/MM/yyyy au format yyyy-MM-dd
const convertToDBFormat = (date) => {
    if (!date) return null;
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
};

const usersControllers = {
    // Récupérer tous les utilisateurs
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                include: { model: Role, as: 'role' }
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
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
        }
    },

    // Récupérer un utilisateur par son ID
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

    // Créer un nouvel utilisateur
    createUser: async (req, res) => {
        const { name, surname, email, birthday, city_of_birth, time_of_birth, password, role } = req.body;

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                surname,
                email,
                birthday: convertToDBFormat(birthday),
                city_of_birth,
                time_of_birth,
                password: hashedPassword,
                id_Roles: role
            });

            res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
        }
    },

    // Mettre à jour un utilisateur par son ID
    updateUser: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).send('Utilisateur non trouvé');
            }

            const updatedData = { ...req.body };
            if (updatedData.birthday) {
                updatedData.birthday = convertToDBFormat(updatedData.birthday);
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

    // Supprimer un utilisateur par son ID
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

