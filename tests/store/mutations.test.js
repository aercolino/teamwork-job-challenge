import { mutations } from '../../src/store';

const SOME_PEOPLE = {
  people: [
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
  ],
  peopleCount: 24,
  currentPage: 1,
};

describe('mutations', () => {
  it('addPlanet', () => {
    const state = {
      ...SOME_PEOPLE,
    };
    const planet = {name: 'Xyz', url: 'https://example.com/1'};
    mutations.addPlanet(state, {planet});
    expect(state.planets).toEqual(expect.objectContaining({[planet.url]: planet}));
  });

  describe('addPeoplePage', () => {
    it('works for the first page', () => {
      const state = {
        people: [],
        currentPage: 0,
        peopleCount: 0,
      };
      const page = {
        "count": SOME_PEOPLE.peopleCount,
        "next": "https://swapi.dev/api/people/?search=&page=2",
        "previous": null,
        "results": SOME_PEOPLE.people,
      };
      mutations.addPeoplePage(state, {page});
      expect(state.people).toEqual(expect.arrayContaining(SOME_PEOPLE.people));
      expect(state.currentPage).toBe(1);
    });

    it('works for another full page', () => {
      const state = {
        ...SOME_PEOPLE,
      };
      const morePeople = [
        {name:'Pepito 2'},
        {name:'Juanito 2'},
        {name:'Pepito 3'},
        {name:'Juanito 3'},
        {name:'Fulanito 3'},
        {name:'Jaimito 3'},
        {name:'Pepito 4'},
        {name:'Juanito 4'},
        {name:'Fulanito 4'},
        {name:'Jaimito 4'},
      ];
      const page = {
        "count": 24,
        "next": "https://swapi.dev/api/people/?search=&page=3",
        "previous": "https://swapi.dev/api/people/?search=&page=1",
        "results": morePeople,
      };
      mutations.addPeoplePage(state, {page});
      expect(state.people).toEqual(expect.arrayContaining(morePeople));
      expect(state.currentPage).toBe(2);
    });

    it('works for another partial page', () => {
      const state = {
        ...SOME_PEOPLE,
      };
      const morePeople = [
        {name:'Pepito 2'},
        {name:'Juanito 2'},
        {name:'Pepito 3'},
        {name:'Juanito 3'},
      ];
      const page = {
        "count": 24,
        "next": "null",
        "previous": "https://swapi.dev/api/people/?search=&page=2",
        "results": morePeople,
      };
      mutations.addPeoplePage(state, {page});
      expect(state.people).toEqual(expect.arrayContaining(morePeople));
      expect(state.currentPage).toBe(2);
    });
  });

  describe('setPeopleQuery', () => {
    const state = {
      ...SOME_PEOPLE,
    };
    mutations.setPeopleQuery(state, {query: 'pepito'});
    expect(state.peopleQuery).toBe('pepito');
    expect(state.people.length).toBe(0);
  });
});
