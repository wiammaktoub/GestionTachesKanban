# GestionTachesKanban

## Objectifs du Projet
- Fournir un outil de gestion des tâches simple et intuitif.
- Permettre une collaboration fluide entre les membres d'une équipe.
- Assurer un suivi efficace des tâches via un tableau Kanban.

## Membres de l'Équipe
- **MAKTOUB Wiam**
- **DAKIR ALLAH Abderrahman**
- **HADDADIA Saad**
- **BENGOUG Cheikh Hadrami**

## Liste des Fonctionnalités Principales
- Inscription et authentification des utilisateurs.
- Création, modification et suppression des tâches.
- Attribution des tâches aux membres.
- Affichage sous forme de tableau Kanban.
## Features 🤩

- Login/Register with JWT token authentication
- Ability to create/update/delete the board
- Ability to add/update/move/delete the card
- Background image library for the board
- Add labels to the card
- Supports adding of detail description in the card

## Requirements

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/)

## Steps to run this on your local

First install the MongoDB Compass for better visualization of data with MongoDB server.

1. Clone this repo using `git clone https://github.com/knowankit/trello-clone.git`
2. Create _.env.local_ and add this env variable `LOCAL_MONGODB=mongodb://localhost:27017/trello`
3. Run `yarn install`
4. Run `yarn dev`

`For unsplash gallery, api key is needed which can be generated from unsplash website`

### If you want to run the project using docker

Install docker on your machine and start it

1. Create _.env.development_ file.
2. Add `LOCAL_MONGODB=mongodb://mongodb:27017/trello`
3. Run `docker-compose up`

## What's next 🚀

- Assign a card to the user
- Comment on the card
- Invite user to the board (In progress)

## Tech stacks

- Nextjs with typescript
- MongoDB for local development
- Mongo Atlas for production DB
- Chakra UI library

## Some free resources used in this project

1. [Color Code](https://www.designpieces.com/palette/trello-color-palette-hex-and-rgb/)
2. [Illustration](https://undraw.co/illustrations)
3. [Icons](https://github.com/react-icons/react-icons)

## Support

Reach out to the maintainer at one of the following places:

- The email which is located [in GitHub profile](https://github.com/knowankit)
- [Portfolio] (https://knowankit.com)

## Contributing

All contributions are welcome!

## License

This project is licensed under the **MIT license**. Feel free to edit and distribute this template as you like.

See [LICENSE](LICENSE) for more information.
