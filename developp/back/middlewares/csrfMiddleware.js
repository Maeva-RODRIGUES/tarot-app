// Utilisation des tokens CSRF pour protéger les routes POST contre les attaques CSRF.
// Attaques CSRF = Une vulnérabilité CSRF (pour Cross-Site Request Forgery, en français : falsification de requête inter-site) est une faille qui permet à un attaquant d’abuser à la fois d’un utilisateur, d’un navigateur web et d’un serveur.
// middlewares/csrfMiddleware.js

// const csurf = require('csurf');

// const csrfProtection = csurf({ cookie: true });

// module.exports = csrfProtection;