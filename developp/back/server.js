//server.js

require('dotenv').config();


const { sequelize } = require('./models/indexModels');
const path = require('path');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const portfinder = require('portfinder');
const helmet = require('helmet'); // Middleware pour sécuriser les applications Express
const rateLimit = require('express-rate-limit');// Middleware pour limiter le taux de requêtes

// const csrfProtection = require('./middlewares/csrfMiddleware');


const indexRoutes = require('./routes/indexRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware pour sécuriser l'application Express
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "http://localhost:8000"],
        // Ajoutez d'autres directives selon vos besoins
    }
})); // Utilisation de Helmet pour configurer divers en-têtes HTTP sécurisés
app.use(express.json()); // Middleware pour parser les données JSON des requêtes
app.use(morgan('dev')); // Logging détaillé des requêtes HTTP dans la console (environnement de développement)
app.use(cookieParser()); // Middleware pour parser les cookies des requêtes

app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'ALLOWALL'); // Désactiver X-Frame-Options (uniquement pour test)
    next();
});




// Servir le dossier uploads de manière statique
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: function (res, path, stat) {
        res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    }
}));


// Configuration des options CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Origine autorisée
    credentials: true, // Permet d'envoyer des cookies
  };
  app.use(cors(corsOptions));

// Limitation du taux de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par windowMs
});
app.use(limiter);

// Redirection vers HTTPS en production 
// if (process.env.NODE_ENV === 'production') {
//     app.use((req, res, next) => {
//         if (req.header('x-forwarded-proto') !== 'https') {
//             res.redirect(`https://${req.header('host')}${req.url}`);
//         } else {
//             next();
//         }
//     });
// }

// Utilisation du middleware CSRF
// app.use(csrfProtection);

// Utilisation du routeur centralisé
app.use('/api/tarot', indexRoutes);

// Route de base pour afficher un message de bienvenue
app.get('/', (req, res) => {
    console.log('Requête reçue pour la route de base');
    res.send('Bienvenue sur l\'API du tarot en ligne');
});

// Middleware d'erreur centralisé
app.use(errorHandler);


// Vérification de la connexion à la base de données et démarrage du serveur
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données établie avec succès.');
        return sequelize.sync(); // Synchronisation des modèles avec la base de données
    })
    .then(() => {
        // Recherche d'un port disponible avec portfinder
        portfinder.getPortPromise()
            .then((port) => {
                app.listen(port, () => {
                    console.log(`Serveur démarré sur le port ${port}`);
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la recherche d\'un port libre :', error);
            });
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données :', err);
    });


module.exports = app;