# Deploiement Heroku
1. Installer Heroku CLI **`npm install -g heroku`**
2. Dans terminal VSC : **`heroku --version`** pour vérifier que cela fonctionne 
3. Puis **`heroku login`**, redirection vers navigateur et click sur login

## Variables d'environnement
4. Différencier les commandes pour exécuter l'API (local / en production) dans **`package.json`** : 
```js
// On retire nodemon en production
"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
```
6.  `process.env.PORT` sera différent selon l’environnement. On spécifie `const port = process.env.PORT || 5000` dans notre fichier racine
7. Définir l'environnement d'exécution de nos scripts grace à la variable globale `process`, avec sa propriété `process.env` qui est accessible de manière globale dans tous nos fichiers
9. On installe le package cross-env afin de définir les environnements d'exécution dans nos scripts du **`package.json`** **`npm install cross-env`** **`NODE_ENV=production`**

```js
// On retire nodemon en production
"scripts": {
    "start": "cross-env NODE_ENV=production node app.js",
    "dev": "cross-env NODE_ENV=development nodemon app.js"
  }
```

Dans le fichier racine, on retire également en production `app.use(morgan(’dev’))`
```js
if (process.env.NODE_ENV  ===  "development") {
	const  morgan  =  require('morgan')
	app.use(morgan('dev'))
}
```

10.  On versionne, puis on utilise la CLI de Heroku  **`heroku create`** *(dans le dashboard de heroku.com, on voit apparaître le projet ainsi créé, avec une url auto-générée)*
11. On met à jour le projet en production  **`git commit`** **`git push heroku main`** 
12.  Il est nécessaire d’ajouter un add-on sur le compte Heroku pour la gestion d’une bdd mariadb, en l’occurrence, il s’agit de **JawsDB Maria**
13.  Heroku → click sur projet → configure add-on
14.  récupérer les configurations de JawsDB sur l’onglet Overview
15.  On configure l'ORM Sequelize selon l'environnement d'exécution, les configurations sont importées depuis **configs/db-configs.json** (*Ce fichier ne doit pas être publié sur Github, car il contient les données privées fournies par Heroku* 🤫)

```js
const  env  =  process.env.NODE_ENV;
const  config  =  require('../configs/db-config.json')[env];

const  sequelize  =  new  Sequelize(config.database, config.username, config.password, {
	host:  config.host,
	dialect:  config.dialect,
	logging:  false
});
```

16.  On retire le paramètre `force: true` → `sequelize.sync()` qui permet en développement de rafraîchir/écraser notre bdd à chaque modification de notre code
```js
const  resetDb  =  process.env.NODE_ENV  ===  "development"
sequelize.sync({ force:  resetDb })
```
17.  On ajoute la gestion des Cross Origin policy CORS, `npm install cors`
Dans le fichier racine app.js : on ajoute 
```js
const  cors  =  require('cors')
// ...
const  corsOptions  = {
credentials:  true,
};
// ...
app.use(cors(corsOptions))
```