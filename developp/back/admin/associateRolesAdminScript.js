// Exécuter le script manuellement au besoin depuis le terminal avec Node.js : node associateRoles.js
// associateRolesAdminScript.js

const { User, Role } = require('../models/indexModels');

async function associateUsersWithRoles() {
    const users = await User.findAll();
    const adminRoleId = 1; 
    const userRoleId = 2; 
  
    for (const user of users) {
      // Déterminez si l'utilisateur doit être un 'Admin'
      const roleId = user.email.includes('admin') ? adminRoleId : userRoleId;
      
      // Mettez à jour l'utilisateur avec le rôle approprié
      await user.update({ id_Roles: roleId });
    }
  }

associateUsersWithRoles().then(() => {
  console.log('Les utilisateurs ont été associés à des rôles.');
}).catch(err => {
  console.error('Erreur lors de l\'association des rôles :', err);
});
