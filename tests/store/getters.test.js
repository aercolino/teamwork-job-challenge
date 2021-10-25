import { getters } from '../../src/store';

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
    {name:'Pepito 2'},
    {name:'Juanito 2'},
    {name:'Fulanito 3'},
    {name:'Jaimito 3'},
    {name:'Pepito 3'},
    {name:'Juanito 3'},
    {name:'Fulanito 4'},
    {name:'Jaimito 4'},
    {name:'Pepito 4'},
    {name:'Juanito 4'},
    {name:'Pepito 5'},
    {name:'Juanito 5'},
    {name:'Fulanito 5'},
    {name:'Jaimito 5'},
],
  peopleCount: 24,
}

describe('getters', () => {

  describe('currentPagePeople', () => {
    it('does not throw for no people', () => {
      const state = {
        people: [],
        peopleCount: 0,
        currentPage: 0,
      };
      expect(() => getters.currentPagePeople(state)).not.toThrow();
    });

    it('works for the first page', () => {
      const state = {
        ...SOME_PEOPLE,
        currentPage: 1,
      };
      const actual = getters.currentPagePeople(state);
      expect(Array.isArray(actual)).toBeTruthy();
      expect(actual).toEqual([
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
      ]);
    });

    it('works for a middle page', () => {
      const state = {
        ...SOME_PEOPLE,
        currentPage: 2,
      };
      const actual = getters.currentPagePeople(state);
      expect(Array.isArray(actual)).toBeTruthy();
      expect(actual).toEqual([
        {name:'Pepito 2'},
        {name:'Juanito 2'},
        {name:'Fulanito 3'},
        {name:'Jaimito 3'},
        {name:'Pepito 3'},
        {name:'Juanito 3'},
        {name:'Fulanito 4'},
        {name:'Jaimito 4'},
        {name:'Pepito 4'},
        {name:'Juanito 4'},
      ]);
    });

    it('works for the last page', () => {
      const state = {
        ...SOME_PEOPLE,
        currentPage: 3,
      };
      const actual = getters.currentPagePeople(state);
      expect(Array.isArray(actual)).toBeTruthy();
      expect(actual).toEqual([
        {name:'Pepito 5'},
        {name:'Juanito 5'},
        {name:'Fulanito 5'},
        {name:'Jaimito 5'},
      ]);
    });
  });

});
