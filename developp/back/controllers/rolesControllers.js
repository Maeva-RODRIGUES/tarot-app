// rolesControllers.js

const { Role } = require('../models/indexModels');

const rolesControllers = {
    // Récupérer tous les rôles
    getAllRoles: async (req, res) => {
        try {
            const roles = await Role.findAll();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des rôles', error });
        }
    },

    // Récupérer un rôle spécifique par son ID
    getRoleById: async (req, res) => {
        const id = req.params.id;
        try {
            const role = await Role.findByPk(id);
            if (!role) {
                return res.status(404).json({ message: 'Rôle non trouvé' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération du rôle', error });
        }
    },

    // Créer un nouveau rôle
    createRole: async (req, res) => {
        try {
            const newRole = await Role.create(req.body);
            res.status(201).json(newRole);
        } catch (error) {
            res.status(400).json({ message: 'Erreur lors de la création du rôle', error });
        }
    },

    // Mettre à jour un rôle par son ID
    updateRole: async (req, res) => {
        const id = req.params.id;
    
        try {
            // Effectue la mise à jour du rôle dans la base de données
            const updatedCount = await Role.update(req.body, {
                where: { id: id }, // Condition de mise à jour basée sur l'ID
            });
    
            // Vérifie si au moins un enregistrement a été mis à jour
            if (updatedCount[0] > 0) {
                // Si oui, récupère le rôle mis à jour à partir de la base de données
                const updatedRole = await Role.findOne({ where: { id: id } });
                // Renvoie une réponse JSON avec le message de succès et le rôle mis à jour
                res.json({ message: 'Rôle mis à jour avec succès', updatedRole });
            } else {
                // Si aucun enregistrement n'a été mis à jour, renvoie une erreur 404
                res.status(404).send('Rôle non trouvé ou pas de changement effectué');
            }
        } catch (error) {
            // En cas d'erreur lors de la mise à jour du rôle, log l'erreur et renvoie une réponse d'erreur 500
            console.error('Erreur lors de la mise à jour du rôle :', error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour du rôle', error });
        }
    },

    // Supprimer un rôle par son ID
    deleteRole: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedCount = await Role.destroy({
                where: { id: id }
            });
            if (deletedCount > 0) {
                res.json({ message: 'Rôle supprimé avec succès' });
            } else {
                res.status(404).send('Rôle non trouvé');
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du rôle', error });
        }
    }
};

module.exports = rolesControllers;
