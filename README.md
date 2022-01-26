# United&period;co

United&period;co est une **application web** permettant de mettre en relation des **donateurs** et des **associations** grâce aux différentes fonctionnalités présentes sur le site. 

- Dons 
- Abonnements
- Services

## Pré-requis

Les différentes technologiques et dépendances suivantes seront nécessaires au développement du site :

- ***Backend***
	- Node.js (la version 14.0.0 ou plus)
	- NestJs
	- XAMPP ou Wamp
- ***Frontend***
	- Node.js
	- React
	- PrimeReact
	- SASS
	- TailWindCSS

## Mise en place

Nous allons maintenant installer toutes les dépendances citées ci-dessus.

#### Backend
- Si vous n'avez pas ***Node.js***, veuillez l'installer en suivant ce [lien](https://nodejs.org/en/) 

- Si vous n'avez pas ***XAMPP ou Wamp***, veuillez installer l'un de ces deux outils avec les liens suivants :  [XAMPP](https://www.apachefriends.org/download.html) ou [Wamp](https://sourceforge.net/projects/wampserver/)

- Installer ***NestJS*** avec la commande suivante :
##### Installation de NestJS
> npm i -g @nestjs/cli 

##### Base de données
##### Exécuter la migration 

> npm install --save @nestjs/typeorm typeorm mysql2 

> npm run typeorm:run 

> si vous voulez créer une nouvelle migration: npm run typeorm:migrate non_fichier  puis npm run typeorm:run

#### Frontend
- Si vous n'avez pas ***node.js***, veuillez l'installer avec ce [lien](https://nodejs.org/en/)
- Exécuter les commandes suivantes : 

##### Installation de PrimeReact

> npm install primereact

> npm install primeicons

##### Installation de SASS

> npm install -g sass

##### Installation de TailWindCSS

> npm install -D tailwindcss 
> npx tailwindcss init

##### Instalation des routes react
> npm install react-router-dom

react-boilerplate : https://github.com/react-boilerplate/react-boilerplate


