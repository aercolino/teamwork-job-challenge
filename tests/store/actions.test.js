import { axios } from '../../src/store';
import store from '../../src/store';

const realAxiosGet = axios.get.bind(axios);


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

  describe('loadNextPageOfPeople', () => {
    const page1 = {
      "count": 14,
      "next": "https://swapi.dev/api/people/?search=&page=2",
      "previous": null,
      "results": [
        {name:'Pepito 0'},
        {name:'Juanito 0'},
        {name:'Fulanito 0'},
        {name:'Jaimito 0'},
        {name:'Pepito 1'},
        {name:'Juanito 1'},
        {name:'Fulanito 1'},
        {name:'Jaimito 1'},
        {name:'Pepito 2'},
        {name:'Juanito 2'},
      ]
    };
    const page2 = {
      "count": 14,
      "next": null,
      "previous": "https://swapi.dev/api/people/?search=&page=1",
      "results": [
        {name:'Pepito 5'},
        {name:'Juanito 5'},
        {name:'Fulanito 5'},
        {name:'Jaimito 5'},
      ]
    };
    
    it('works', async () => {
      // first page
      const mockGet1 = jest.fn();
      mockGet1.mockResolvedValue({data: page1});
      axios.get = mockGet1;
      await store.dispatch('loadNextPageOfPeople');
      expect(store.state.people).toEqual(expect.arrayContaining(page1.results));
      expect(store.state.currentPage).toBe(1);

      // second page
      const mockGet2 = jest.fn();
      mockGet2.mockResolvedValue({data: page2});
      axios.get = mockGet2;
      await store.dispatch('loadNextPageOfPeople');
      expect(store.state.people).toEqual(expect.arrayContaining(page1.results)); // first page keeps being there
      expect(store.state.people).toEqual(expect.arrayContaining(page2.results));
      expect(store.state.currentPage).toBe(2);

      // no more pages
      const mockGet4 = jest.fn();
      axios.get = mockGet4;
      await store.dispatch('loadNextPageOfPeople');
      expect(store.state.people).toEqual(expect.arrayContaining(page1.results)); // first page keeps being there
      expect(store.state.people).toEqual(expect.arrayContaining(page2.results)); // second page keeps being there
      expect(mockGet4.mock.calls.length).toBe(0); // no other page is downloaded
    });
  });

});
