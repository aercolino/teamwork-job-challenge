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


## Dev Notes

I created the project with `$ vue create andrea-ercolino` and renamed the root folder to `AndreaErcolino`.


### First ideas

- The text of the challenge is a bit misleading: the first appearance of _users_ should be _people_. All other usages are OK
- This is a classical example where the API could be externally improved by having a piece of middleware do the drill beforehand (for example, attaching to the list of people in the current page a separate list of unique planets referenced by those people), instead of letting the frontend do it
- That could also be bettered by populating people with their planet data, maybe using GraphQL


#### About the list of people

- The endpoint `GET /api/people/<personId>` returns a JSON response like this:

```json
{
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "homeworld": "https://swapi.dev/api/planets/1/",
    "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
    ],
    "species": [],
    "vehicles": [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
    ],
    "starships": [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
    ],
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-20T21:17:56.891000Z",
    "url": "https://swapi.dev/api/people/1/"
}
```

- The response to `GET /api/people/<personId>` shows that we are meant to display columns data straight from `name`, `height`, `mass`, `created`, and `edited` properties
    - As for the `Planet Name` column, we are meant to select the `homeworld` URL, make a request to the endpoint `GET /api/planets/<planetId>/`, extract the planet's name, and finally display it


#### About the planet's info

- The endpoint `GET /api/planets/<planetId>/` returns a JSON response like this:

```json
{
    "name": "Tatooine",
    "rotation_period": "23",
    "orbital_period": "304",
    "diameter": "10465",
    "climate": "arid",
    "gravity": "1 standard",
    "terrain": "desert",
    "surface_water": "1",
    "population": "200000",
    "residents": [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/",
        "https://swapi.dev/api/people/4/",
        "https://swapi.dev/api/people/6/",
        "https://swapi.dev/api/people/7/",
        "https://swapi.dev/api/people/8/",
        "https://swapi.dev/api/people/9/",
        "https://swapi.dev/api/people/11/",
        "https://swapi.dev/api/people/43/",
        "https://swapi.dev/api/people/62/"
    ],
    "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/"
    ],
    "created": "2014-12-09T13:50:49.641000Z",
    "edited": "2014-12-20T20:58:18.411000Z",
    "url": "https://swapi.dev/api/planets/1/"
}
```

- The response to `GET /api/planets/<planetId>/` shows that we are meant to display data straight from `name`, `diameter`, `climate`, and `population` properties.
    - We are not required to display data of the `created` and `edited` properties here. For uniformity, I'm going to display them here too.


#### About paginated results

- The endpoint `GET /api/people` returns a JSON response like this:

```json
{
    "count": 82,
    "next": "https://swapi.dev/api/people/?page=2",
    "previous": null,
    "results": [
      ...
    ]
}
```

- The endpoint `GET /api/planets` returns a JSON response like this:

```json
{
    "count": 60,
    "next": "https://swapi.dev/api/planets/?page=2",
    "previous": null,
    "results": [
        ...
    ]
}
```

- From the responses above we understand that all lists are paginated in the same fashion (which is also very common worldwide)


#### About how I'm going to load and display data

- I'll download the first page of people with `GET /api/people`
- I'll add a _Prev_ / _Next_ couple of buttons, to navigate pages, according to `previous` and `next` properties
- I'll add a message to help user orientation, like: _Page 3 of 8_
- For all people in the current page, I'll display their data
- If the planet of a person is yet to be requested
    - I'll request it with `GET /api/planets/<planetId>/`
    - I'll display a loading indicator meanwhile
    - I'll display an error indicator, if the request failed
- Downloaded data will be kept in the store, so that the user will be able to navigate back and forth without issuing unneeded requests


#### Alternative about loading planets

- There are only 60 planets, which means only 6 requests to `GET /api/planets` to download them all beforehand
- I won't go this way because the previous one won't make the user wait indefinitely before being able to interact
- And if we were to do for star ships, vehicles, ... the same we did for planets, the UX would be richer but not slower


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
