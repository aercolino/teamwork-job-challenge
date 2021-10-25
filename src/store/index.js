import Axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const axios = Axios.create({
  baseURL: 'https://swapi.dev/api/',
});


const PEOPLE_PER_PAGE = 10;

function pageLimits(pageNumber, peopleCount) {
  const firstIndex = PEOPLE_PER_PAGE * (pageNumber - 1);
  const lastIndex = Math.min(firstIndex + PEOPLE_PER_PAGE - 1, peopleCount - 1);
  return {firstIndex, lastIndex};
}

function emptyPeople() {
  return {
    people: [],
    peopleCount: 0,
    currentPage: 0,
    pagesCount: 0, 
  };
}


const state = {
  ...emptyPeople(),
  planets: {},
  peopleQuery: '',
};


const getters = {
  currentPagePeople: (state) => {
    const {firstIndex, lastIndex} = pageLimits(state.currentPage, state.peopleCount);
    return state.people.slice(firstIndex, lastIndex + 1);
  },
  isLastPage: (state) => state.currentPage > 0 && state.currentPage === state.pagesCount,
  isFirstPage: (state) => state.currentPage === 1,
  isPageAvailable: (state) => (pageNumber) => {
    const {firstIndex, lastIndex} = pageLimits(pageNumber, state.peopleCount);
    return state.people[firstIndex] && state.people[lastIndex];
  }
};


const mutations = {
  addPlanet(state, {planet}) {
    state.planets = {
      ...state.planets,
      [planet.url]: planet,
    };
  },
  addPeoplePage(state, {page}) {
    const {results, count} = page;
    state.people = state.people.concat(...results);
    state.currentPage += 1;
    state.pagesCount = Math.ceil(count / 10);
    state.peopleCount = count;
  },
  incrementPage(state) {
    state.currentPage += 1;
  },
  decrementPage(state) {
    state.currentPage -= 1;
  },
  setPeopleQuery(state, {query}) {
    const cleanQuery = query.trim();
    if (cleanQuery === state.peopleQuery) return;
    Object.assign(state, emptyPeople());
    state.peopleQuery = cleanQuery;
  },
};


const actions = {
  async loadPlanetIfMissing({state, commit}, {id: url}) {
    try {
      if (!state.planets[url]) {
        commit('addPlanet', {planet: {url}}); // placeholder to avoid multiple requests for the same url
        const {data: planet} = await axios.get(url);
        commit('addPlanet', {planet});
      }
    }
    catch (e) {
      console.log('ERROR', e.stack ?? e.message);
    }
  },
  async loadNextPageOfPeople({state, getters, commit}) {
    try {
      if (getters.isLastPage) return;
      const nextPage = state.currentPage + 1;
      const encodeQuery = encodeURIComponent(state.peopleQuery);
      const {data: page} = await axios.get(`people/?search=${encodeQuery}&page=${nextPage}`);
      commit('addPeoplePage', {page});
    }
    catch (e) {
      console.log('ERROR', e.stack ?? e.message);
    }
  },
  async navigateToNextPage({state, getters, commit, dispatch}) {
    try {
      if (getters.isLastPage) return;
      if (!getters.isPageAvailable(state.currentPage + 1)) {
        await dispatch('loadNextPageOfPeople');
      }
      else {
        commit('incrementPage');
      }
    }
    catch (e) {
      console.log('ERROR', e.stack ?? e.message);
    }
  },
  navigateToPrevPage({getters, commit}) {
    try {
      if (getters.isFirstPage) return;
      commit('decrementPage');
    }
    catch (e) {
      console.log('ERROR', e.stack ?? e.message);
    }
  },
};


const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: true
})


export default store;
