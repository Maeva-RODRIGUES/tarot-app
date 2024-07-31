//Audit et Monitoring
// logger.js : fichier de configuration pour Winston


const winston = require('winston');

// Configuration de Winston pour la gestion des logs
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log vers la console
    new winston.transports.File({ filename: 'error.log', level: 'error' }) // Log vers un fichier error.log pour les erreurs
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

module.exports = logger;