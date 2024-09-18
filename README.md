# Plateforme de gestion de projets : Tiny Maestro

## Aperçu

Il s'agit d'une plateforme complète de gestion de projets qui permet aux utilisateurs de :
- Créer et gérer des projets.
- Attribuer des tâches aux membres d'un projet.
- Collaborer en temps réel grâce à un système de chat dédié à chaque projet.
- Seuls les membres d'un projet peuvent consulter et participer aux discussions dans le chat du projet.

La plateforme est construite avec :
- Backend : Express.js avec MongoDB (Mongoose)
- Communication en temps réel : Socket.io pour le chat
- Frontend : React.js (avec Redux Toolkit Query pour les appels API et Socket.io-client pour les mises à jour en temps réel)
- Authentification : Basée sur JWT avec contrôle d'accès en fonction des rôles

---

## Technologies utilisées

### Backend
- Node.js avec Express.js
- MongoDB avec Mongoose
- Socket.io pour la communication en temps réel via WebSocket

### Frontend
- React.js
- Redux Toolkit Query pour les requêtes HTTP
- Socket.io-client pour la communication en temps réel
- Bootsrap

### Authentification
- JWT (JSON Web Token) avec contrôle d'accès basé sur les rôles

---

## Fonctionnalités

### Rôles des utilisateurs
- Admin : Peut voir et gérer tous les projets.
- Membres du projet : Peuvent consulter et collaborer sur les projets auxquels ils sont associés, y compris participer aux discussions.

### Projets
- Créer, mettre à jour et supprimer des projets.
- Ajouter ou retirer des membres du projet.
- Seuls les membres peuvent consulter et interagir avec le projet.

### Tâches
- Créer, mettre à jour et supprimer des tâches.
- Attribuer des tâches aux membres du projet.
- Filtrer et trier les tâches par statut, date d'échéance et priorité.

### Chat en temps réel
- Seuls les membres du projet peuvent consulter et participer au chat.
- Les messages sont stockés dans MongoDB, et le chat est alimenté par Socket.io.

---

## Installation du Backend

### Pré-requis
1. Node.js (v14+)
2. MongoDB (instance locale ou sur le cloud comme MongoDB Atlas)

### Installation

1. Cloner le dépôt :
   git clone https://github.com/d4rcel/aeig_test_technique.git

2. Naviguer dans le répertoire du backend :
   cd aeig_test_technique/backend

3. Installer les dépendances :
   npm install

4. Configurer les variables d'environnement en créant un fichier .env dans le répertoire backend. Ajouter les variables suivantes :
   NODE_ENV=development
   MONGODB_USERNAME=username
   MONGODB_PASSWORD=mot_de_passe
   MONGODB_DATABASE_NAME=tinymaestro
   DATABASE_URL=mongodb://username:mot_de_passe@localhost:27017/tinymaestro?authSource=tinymaestro
   ACCESS_TOKEN_PRIVATE_KEY=cle_prive_access_token
   ACCESS_TOKEN_PUBLIC_KEY=cle_public_access_token
   REFRESH_TOKEN_PRIVATE_KEY=cle_prive_refresh_token
   REFRESH_TOKEN_PUBLIC_KEY=cle_public_refresh_token

6. Démarrer le serveur :
   npm start

7. Le serveur sera lancé sur http://localhost:8000.

---

## Installation du Frontend

### Pré-requis
1. Node.js (v14+)
2. React.js (Vite)

### Installation

1. Naviguer dans le répertoire du frontend :
   cd aeig_test_technique/frontend

2. Installer les dépendances :
   npm install

3. Configurer les variables d'environnement en créant un fichier .env dans le répertoire frontend. Ajouter les variables suivantes :
   VITE_NODE_ENV=development
   VITE_SERVER_ENDPOINT=http://localhost:8000

4. Démarrer le serveur de développement React :
   npm start

5. Le frontend sera lancé sur http://localhost:5173.

---

## Améliorations futures
- Permissions basées sur les rôles pour les membres du projet (par exemple, les chefs de projet peuvent assigner des tâches, les contributeurs non).
- Notifications pour les nouvelles tâches, les mises à jour de statut des tâches et les nouveaux messages de chat.
- Partage de fichiers dans le chat.

---

## Contribuer

1. Forkez le dépôt.
2. Créez une nouvelle branche (git checkout -b feature/nom-de-votre-fonctionnalité).
3. Commitez vos modifications (git commit -m 'Ajouter votre fonctionnalité').
4. Poussez vers la branche (git push origin feature/nom-de-votre-fonctionnalité).
5. Ouvrez une Pull Request.

---

