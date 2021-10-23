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

const state = {
  people: [],
  peopleCount: 0,
  currentPage: 0,
  pagesCount: 0,
};

const getters = {
  currentPagePeople: (state) => {
    const {firstIndex, lastIndex} = pageLimits(state.currentPage, state.peopleCount);
    return state.people.slice(firstIndex, lastIndex + 1);
  },
  isLastPage: (state) => state.currentPage > 0 && state.currentPage === state.pagesCount,
  isPageAvailable: (state) => (pageNumber) => {
    const {firstIndex, lastIndex} = pageLimits(pageNumber, state.peopleCount);
    return state.people[firstIndex] && state.people[lastIndex];
  }
};

const mutations = {
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
  }
};

const actions = {
  async loadNextPageOfPeople({state, getters, commit}) {
    try {
      if (getters.isLastPage) return;
      const nextPage = state.currentPage + 1;
      const {data: page} = await axios.get(`people/?page=${nextPage}`);
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
  }
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: true
})


export default store;
