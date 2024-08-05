// usersControllers.js

const bcrypt = require('bcrypt');
const { User, Role } = require('../models/indexModels');

const usersControllers = {
    // Récupérer tous les utilisateurs
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
        }
    },

    // Récupérer un utilisateur par son ID
    getUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
        }
    },

    // Créer un nouvel utilisateur
    createUser: async (req, res) => {
        const { name, surname, email, birthday, city_of_birth, time_of_birth, password, role } = req.body;

        try {
            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
            }

            // Hacher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créer un nouvel utilisateur
            const newUser = await User.create({
                name,
                surname,
                email,
                birthday,
                city_of_birth,
                time_of_birth,
                password: hashedPassword,
                id_Roles: role // Assurez-vous que vous passez le bon ID de rôle
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
    
            // Mettre à jour uniquement les champs fournis dans req.body
            await user.update(req.body);
    
            // Recharger les données mises à jour
            const updatedUser = await User.findByPk(id);
    
            res.json({ message: 'Utilisateur mis à jour avec succès', updatedUser });
        } catch (error) {
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

