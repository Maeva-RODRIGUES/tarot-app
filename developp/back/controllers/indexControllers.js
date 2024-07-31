// indexControllers.js : centralise tout les fichiers controllers en les importan

const cardsControllers = require('./cardsControllers');
const drawingsControllers = require('./drawingsControllers');
const reviewsControllers = require('./reviewsControllers');
const rolesControllers = require('./rolesControllers');
const themesControllers = require('./themesControllers');
const usersControllers = require('./usersControllers');
const authControllers = require('./authControllers');
const uploadControllers = require('./uploadControllers');



module.exports = {
    cardsControllers,
    drawingsControllers,
    reviewsControllers,
    rolesControllers,
    themesControllers,
    usersControllers,
    authControllers,
    uploadControllers,
};