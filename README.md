# Plateforme de gestion de projets

## Aperçu

Il s'agit d'une plateforme complète de gestion de projets qui permet aux utilisateurs de :
- Créer et gérer des projets.
- Attribuer des tâches aux membres d'un projet.
- Collaborer en temps réel grâce à un système de chat dédié à chaque projet.
- Seuls les membres d'un projet peuvent consulter et participer aux discussions dans le chat du projet.

La plateforme est construite avec :
- Backend : Express.js avec MongoDB (Mongoose)
- Communication en temps réel : Socket.io pour le chat
- Frontend : React.js (avec Axios pour les appels API et Socket.io-client pour les mises à jour en temps réel)
- Authentification : Basée sur JWT avec contrôle d'accès en fonction des rôles

---

## Technologies utilisées

### Backend
- Node.js avec Express.js
- MongoDB avec Mongoose
- Socket.io pour la communication en temps réel via WebSocket

### Frontend
- React.js
- Axios pour les requêtes HTTP
- Socket.io-client pour la communication en temps réel
- Framework CSS (par exemple, Tailwind CSS ou Material-UI pour le style)

### Authentification
- JWT (JSON Web Token) avec contrôle d'accès basé sur les rôles (RBAC)

---

## Fonctionnalités

### Rôles des utilisateurs
- Admin : Peut voir et gérer tous les projets.
- Propriétaire du projet : Peut créer et gérer ses propres projets et tâches.
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
   git clone https://github.com/votre-utilisateur/plateforme-gestion-projets.git

2. Naviguer dans le répertoire du backend :
   cd plateforme-gestion-projets/backend

3. Installer les dépendances :
   npm install

4. Configurer les variables d'environnement en créant un fichier .env dans le répertoire backend. Ajouter les variables suivantes :
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/gestion_projets
   JWT_SECRET=secret_jwt
   ACCESS_TOKEN_PUBLIC_KEY=clé_publique
   ACCESS_TOKEN_PRIVATE_KEY=clé_privée

5. Démarrer le serveur :
   npm run dev

6. Le serveur sera lancé sur http://localhost:8000.

---

## Installation du Frontend

### Pré-requis
1. Node.js (v14+)
2. React.js (Create React App ou Vite)

### Installation

1. Naviguer dans le répertoire du frontend :
   cd plateforme-gestion-projets/frontend

2. Installer les dépendances :
   npm install

3. Configurer les variables d'environnement en créant un fichier .env dans le répertoire frontend. Ajouter les variables suivantes :
   REACT_APP_API_URL=http://localhost:8000/api
   REACT_APP_SOCKET_URL=http://localhost:8000

4. Démarrer le serveur de développement React :
   npm start

5. Le frontend sera lancé sur http://localhost:3000.

---

## Points d'API Backend

### Authentification
- POST /api/auth/login : Connexion de l'utilisateur.
- POST /api/auth/register : Inscription de l'utilisateur.
- GET /api/auth/logout : Déconnexion de l'utilisateur.

### Utilisateur
- GET /api/users : Récupérer tous les utilisateurs.

### Projet
- POST /api/project : Créer un nouveau projet.
- GET /api/project : Obtenir tous les projets (les admins voient tout, les membres voient uniquement leurs projets).
- PATCH /api/project/:projectId/members/add : Ajouter un membre à un projet.
- PATCH /api/project/:projectId/members/remove : Retirer un membre d'un projet.

### Tâche
- POST /api/task : Créer une nouvelle tâche.
- GET /api/task : Récupérer les tâches avec des filtres (statut, date limite, priorité).
- PATCH /api/task/:taskId : Mettre à jour une tâche.
- DELETE /api/task/:taskId : Supprimer une tâche.

### Chat
- GET /api/chat/:projectId : Récupérer les messages du chat pour un projet.

---

## Intégration WebSocket

### Socket.io

La connexion WebSocket est utilisée pour le chat en temps réel au sein des projets. Seuls les membres du projet peuvent participer au chat.

- URL de connexion : ws://localhost:8000/socket.io/
- Événements :
  - joinProject : Permet de rejoindre une salle de chat pour un projet spécifique.
    socket.emit('joinProject', { projectId: '<project_id>' });
  - sendMessage : Permet d'envoyer un message dans la salle de chat du projet.
    socket.emit('sendMessage', { projectId: '<project_id>', message: 'Bonjour à tous !' });

### Intégration Frontend avec WebSocket
Vous devez connecter le frontend avec Socket.io-client pour activer le chat en temps réel :

import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  auth: {
    token: localStorage.getItem('access_token'),
  },
});

Rejoindre le chat d'un projet :
socket.emit('joinProject', { projectId: 'id_du_projet' });

Écouter les nouveaux messages :
socket.on('newMessage', (message) => {
  console.log('Nouveau message reçu :', message);
});

Envoyer un nouveau message :
socket.emit('sendMessage', {
  projectId: 'id_du_projet',
  message: 'Bonjour, équipe !',
});

---

## Utilisation

### 1. Inscription et Connexion
- Visitez http://localhost:3000/ et inscrivez-vous pour créer un compte.
- Connectez-vous avec vos identifiants pour obtenir un token d'accès (JWT).

### 2. Créer un projet
- Une fois connecté, créez un nouveau projet depuis le tableau de bord.
- Ajoutez des membres à votre projet en sélectionnant dans la liste des utilisateurs.

### 3. Attribuer des tâches
- Créez des tâches pour le projet et assignez-les aux membres de l'équipe.
- Les tâches peuvent être filtrées et triées par statut, date d'échéance et priorité.

### 4. Chat en temps réel
- Rejoignez la salle de chat du projet et communiquez avec les autres membres du projet en temps réel.
- Tous les messages seront stockés dans la base de données et peuvent être consultés ultérieurement.

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

## Licence

Ce projet est sous licence MIT.

---

**Bon développement !** 😊

