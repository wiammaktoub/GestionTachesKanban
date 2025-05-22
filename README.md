# GestionTachesKanban

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## 🎯 Objectifs du Projet

- Fournir un outil de gestion des tâches simple et intuitif.  
- Permettre une collaboration fluide entre les membres d'une équipe.  
- Assurer un suivi efficace des tâches via un tableau Kanban.

---

## 👥 Membres de l'Équipe

- MAKTOUB Wiam  
- DAKIR ALLAH Abderrahman  
- HADDADIA Saad  
- BENGOUG Cheikh Hadrami

---

## 📝 Liste des Fonctionnalités Principales

- Inscription et authentification des utilisateurs  
- Création, modification et suppression des tâches  
- Attribution des tâches aux membres  
- Affichage des tâches sous forme de tableau Kanban

---

## Fonctionnalités 🤩

- Connexion/Inscription avec authentification via jeton JWT  
- Possibilité de créer, modifier et supprimer un tableau  
- Possibilité d’ajouter, modifier, déplacer et supprimer une carte  
- Bibliothèque d’images de fond pour le tableau  
- Ajout d’étiquettes aux cartes  
- Ajout d’une description détaillée aux cartes  

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org/)  
- [npm](https://www.npmjs.com/)

---

## 🛠️ Étapes pour exécuter ce projet en local

> 💡 **Installez d’abord MongoDB Compass** pour une meilleure visualisation des données avec le serveur MongoDB.

1. Cloner ce dépôt avec la commande :  
   ```bash
   git clone https://github.com/your-username/GestionTachesKanban.git

2. Créez un fichier .env.local et ajoutez :

  LOCAL_MONGODB=mongodb://localhost:27017/kanban 


3. Installer les dépendances :
   ```bash
   yarn install

4. Lancer le projet :
    ```bash
   yarn dev

## 🐳  Exécution avec Docker
1. Installez Docker sur votre machine et démarrez-le
   
2. Créez un fichier .env.development
   
3.   Ajoutez :
 
      LOCAL_MONGODB=mongodb://mongodb:27017/kanban
4. Lancez l'application avec : 
   
   ```bash
    docker-compose up


## 🚀  Prochaines fonctionnalités
-Attribution d’une carte à un utilisateur
-Ajout de commentaires sur les cartes
-Invitation d’un utilisateur à rejoindre un tableau (En cours)

## 🧰 Technologies utilisées
-Next.js avec TypeScript
-MongoDB pour le développement local
-Mongo Atlas pour la base de données en production
-Librairie Chakra UI

## 📚 Ressources utilisées
1. [Color Code](https://www.designpieces.com/palette/trello-color-palette-hex-and-rgb/)
2. [Illustration](https://undraw.co/illustrations)
3. [Icons](https://github.com/react-icons/react-icons)

## 💌 Support

Vous pouvez contacter le mainteneur :
- Par e-mail [in GitHub profile](https://github.com/wiammaktoub)


## 🤝 Contribution

Toutes les contributions sont les bienvenues !
N’hésitez pas à proposer des améliorations ou signaler des bugs.
