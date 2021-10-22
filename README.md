# Andrea Ercolino


## Job Challenge

Your mission, should you choose to accept it, is to create a one-page application with a list of people and the details about their related home planet.

The list of people and the information related to a planet can be accessed using the swapi api:

__SWAPI api details__: https://swapi.dev/


### Wireframe description

The candidate should implement a table that contains a list of users with the following columns:

- Name
- Height
- Mass
- Created
- Edited
- Planet Name

When the user clicks on the planet name link a popup is displayed showing the following information regarding the planet:

- Name
- Diameter
- Climate
- Population

The user should be able to sort the table by each column. The user should also be able to filter by searching the person's name.

Stack

- Any modern frontend framework (preferably Vue.js)
- A state management system like Redux, Vuex, or similar

Nice to have

- Some form of caching to make API calls less "spammy"


## Project setup

```sh
npm install
```

### Compiles and hot-reloads for development

```sh
npm run serve
```

### Compiles and minifies for production

```sh
npm run build
```

### Lints and fixes files

```sh
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
