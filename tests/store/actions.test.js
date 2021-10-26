import { axios } from '../../src/store';
import store from '../../src/store';

const realAxiosGet = axios.get.bind(axios);

// const SOME_PEOPLE = {
//   people: [
//     { name: 'Pepito 0' },
//     { name: 'Juanito 0' },
//     { name: 'Fulanito 0' },
//     { name: 'Jaimito 0' },
//     { name: 'Pepito 1' },
//     { name: 'Juanito 1' },
//     { name: 'Fulanito 1' },
//     { name: 'Jaimito 1' },
//     { name: 'Pepito 2' },
//     { name: 'Juanito 2' },
//   ],
//   peopleCount: 24,
//   currentPage: 1,
// };

// const SOME_PLANETS = {
//   planets: {
//     "https://swapi.dev/api/planets/1/": {
//       "name": "Tatooine",
//       "url": "https://swapi.dev/api/planets/1/"
//     },
//     "https://swapi.dev/api/planets/8/": {
//       "name": "Naboo",
//       "url": "https://swapi.dev/api/planets/8/"
//     },
//     "https://swapi.dev/api/planets/2/": {
//       "name": "Alderaan",
//       "url": "https://swapi.dev/api/planets/2/"
//     },
//   },
// };

describe('actions', () => {
  afterEach(() => {
    store.commit('reset');
    axios.get = realAxiosGet; // just in case
  });

  describe('loadPlanetIfMissing', () => {
    it('loads a non existing planet', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({data: {"name":"Stewjon", "url":"https://swapi.dev/api/planets/20/"}});
      axios.get = mockGet;

      await store.dispatch('loadPlanetIfMissing', {id: "https://swapi.dev/api/planets/20/"});
      expect(Object.entries(store.state.planets).length).toBe(1);
      expect(store.state.planets).toEqual(expect.objectContaining({"https://swapi.dev/api/planets/20/": {"name":"Stewjon", "url":"https://swapi.dev/api/planets/20/"}}));
    });

    it('does not load an existing planet', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({data: {"name":"Stewjon", "url":"https://swapi.dev/api/planets/20/"}});
      axios.get = mockGet;

      await store.dispatch('loadPlanetIfMissing', {id: "https://swapi.dev/api/planets/20/"});
      await store.dispatch('loadPlanetIfMissing', {id: "https://swapi.dev/api/planets/20/"});
      // notice that here, it makes no sense to check that Object.entries(store.state.planets).length is still 1
      // because the length wouldn't change if the planet was downloaded again and stored at the same URL (key)
      expect(mockGet.mock.calls.length).toBe(1);
    });
  });

});
