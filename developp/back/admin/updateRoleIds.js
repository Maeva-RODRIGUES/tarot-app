// Ce type de script est généralement exécuté une seule fois ou occasionnellement : pour pallier à mes tests du début
// Pour exécuter le script, naviguer dans le dossier admin et utiliser la commande Node.js : cd admin node updateRoleIds.js
// updateRoleIds.js

const { Role } = require('../models/indexModels'); 

async function updateRoleIds() {
  // Trouver le rôle 'Admin' et mettre à jour son ID à 1
  const adminRole = await Role.findOne({ where: { role_name: 'Admin' } });
  if (adminRole) {
    await adminRole.update({ id: 1 });
  }

  // Trouver le rôle 'User' et mettre à jour son ID à 2
  const userRole = await Role.findOne({ where: { role_name: 'User' } });
  if (userRole) {
    await userRole.update({ id: 2 });
  }
}

updateRoleIds().then(() => {
  console.log('Les ID des rôles ont été mis à jour.');
}).catch(err => {
  console.error('Erreur lors de la mise à jour des ID des rôles :', err);
});


