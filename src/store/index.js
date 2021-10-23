import Axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const axios = Axios.create({
  baseURL: 'https://swapi.dev/api/',
});


const PEOPLE_PER_PAGE = 10;

const state = {
  people: [],
  currentPage: 0,
  pagesCount: 0,
};

const getters = {
  currentPagePeople: state => {
    const startIncluded = PEOPLE_PER_PAGE * (state.currentPage - 1);
    const endExcluded = startIncluded + PEOPLE_PER_PAGE;
    return state.people.slice(startIncluded, endExcluded);
  },
  isLastPage: state => state.currentPage > 0 && state.currentPage === state.pagesCount,
};

const mutations = {
  addPeoplePage(state, {page}) {
    const { results, count } = page;
    state.people = state.people.concat(...results);
    state.currentPage += 1;
    state.pagesCount = Math.ceil(count / 10);
  },
};

const actions = {
  async loadNextPageOfPeople({state, getters, commit}) {
    try {
      if (getters.isLastPage) return;
      const nextPage = state.currentPage + 1;
      const { data: page } = await axios.get(`people/?page=${nextPage}`);
      commit('addPeoplePage', {page});
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
