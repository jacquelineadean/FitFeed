# FIT FEED

## Description
In a social media driven era, creating healthy habits has never been more accessible! FIT FEED is a social networking application that allows users to explore a range of workout videos, healthy recipes, and resources for meditation and self development. If the user finds a video or receipe they would like to share, they are able to create a new post with the link to track their personal progress and share their journey with others.

Try out the app today at: https://fitfeed123.herokuapp.com/ 

![Gif](Assets/demo.gif)

### User Story
```
AS A social media user who values health
I WANT a social media platform where I can connect to like minded people
SO THAT I can find and share healthy mentalities and be accountable for my self development

```
# Table of Contents
[Installation](#installation)

[Usage](#usage)

[Collaborators](#collaborators)

# Installation

## Technologies
The front-end of the application uses HTML, CSS, Bootstrap, JavaScript, and API's from YouTube and Spoonacular.

The back-end of the application is a node.js application powered by express and uses sequelize to interact with a mySQL database. The application also uses a passport middleware for authenticating users.

## For local installation
1. Run `db/schema.sql` to create your database
2. Make sure to create a `.env` file and copy the contents of `.env.example` into it.
3. In the `.env` file replace the ???? for SESSION_SECRET and set your db credentials in LOCALDB_URL
it should look something like this
```
SESSION_SECRET=SomethingBesidesKeyboardCat
LOCALDB_URL=mysql://root:dbpassword@localhost:3306/Project2Dev
```

# Collaborators
@jacquelineadean
@StevenJ87
@Diemrosely
@wsglobe
@PSC151

## Scripts
### Install
    npm install
### Run (production)
    npm start
### Run (dev)
    npm run watch
### Tests (includes linting)
    npm test
### Linting by itself (only detects errors)
    npm run lint
### Autofix linting errors where pssible (Note: this will not necessarily fix all of them)
    npm run fix

