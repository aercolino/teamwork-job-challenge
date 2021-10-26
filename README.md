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
            ...
        ],
        "species": [],
        "vehicles": [
            "https://swapi.dev/api/vehicles/14/",
            ...
        ],
        "starships": [
            "https://swapi.dev/api/starships/12/",
            ...
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
            ...
        ],
        "films": [
            "https://swapi.dev/api/films/1/",
            ...
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
- The number of results per page is 10


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


### About sorting columns

I won't implement this requirement because sorting paginated results without an API, which allows that with a modifier, is painful.

In fact, _paginated results_ means _hold partial results_, while _sorted results_ implies _hold all results_. Given that I decided to match paginated display to paginated download, the only possible solution to sorting in the browser would require to download all pages, which defeats the pagination concept. Anyway, I can think of these alternative solutions:

1. I allow to sort only after the user has managed to manually navigate through all the pages (and download all the results)
2. I allow to sort immediately but I start a full navigation under the hood to download missing results, and (choose one):
    1. the user keeps waiting until all the results came in, then eventually sees the first page of the sorted results
    2. the user always sees the first page of the sorted but partially downloaded results, until no more results come in

The _manual_ full download is not friendly, because it forces the user to do something that could be automated.

The _automatic_ full download is not friendly, because it forces the user to wait all the time we avoided with pagination.

If I had to choose, I would implement the automatic download with incremental sort (2.2 above), but I'm not that convinced because it can be confusing for the user to see all that movement in the items of the first page and that's quite a bit of added complexity, which I don't feel comfortable to implement without talking it through before.


### About filtering by name

I see that there is a modifier for the `GET /api/people` endpoint which allows to search people by name.

Example: `GET /api/people/?search=sky`

- response

    ```json
    {
        "count": 3,
        "next": null,
        "previous": null,
        "results": [
            {
                "name": "Luke Skywalker",
                ...
            },
            {
                "name": "Anakin Skywalker",
                ...
            },
            {
                "name": "Shmi Skywalker",
                ...
            }
        ]
    }
    ```

- Also these results are paginated (as expected)


### Coding


#### About NPM vulnerabilities

After installing Axios and Vuex, NPM has detected 47 vulnerabilities (19 moderate, 28 high). See `dev-documents/audit.txt`.

After inspecting that report, I decide to ignore the issue because all of the vulnerabilities only affect dev dependencies.


### Result

Here are a couple of screenshots.


#### Looking at a planet

Notice:

- _Page 3 of 9_
- _Population_ is expressed in millions
- _Diameter_ is localized to en-US
- _Created_, _Edited_ are formatted

![bespin](./dev-documents/Screenshot%202021-10-25%20at%2013.19.10.png)


#### Searching for \*la\*

Notice:

- _Search_ contains _lars_ but the results are for _la_

![query_la](./dev-documents/Screenshot%202021-10-25%20at%2013.30.18.png)


### Testing


#### Store

I wrote (and passed) all the tests that I wanted to write, except 4 tests that I left as TODO.


#### Components

I had installed some packages to help me tests my components.

```json
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/vue": "^5.8.2",
    "@vue/vue2-jest": "^27.0.0-alpha.2",
```

Eventually I decided to not test them.

While I see the need for testing components if I was to release them, here it would make much more sense to test the app E2E.


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


### Linting

```sh
npm run lint
```


### Testing

```sh
npm run test
```
