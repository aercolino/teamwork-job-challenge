import Axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const axios = Axios.create({
  baseURL: 'https://swapi.dev/api/',
});


const state = {
  people: [],
  peopleCurrentPage: 0,
  peoplePagesCount: 0,
};

const getters = {
  isLastPage: state => state.peopleCurrentPage > 0 && state.peopleCurrentPage === state.peoplePagesCount,
};

const mutations = {
  addPeoplePage(state, {page}) {
    const { results, count } = page;
    state.people = state.people.concat(...results);
    state.peopleCurrentPage += 1;
    state.peoplePagesCount = Math.ceil(count / 10);
  },
};

const actions = {
  async loadNextPageOfPeople({state, getters, commit}) {
    try {
      if (getters.isLastPage) return;
      const nextPage = state.peopleCurrentPage + 1;
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
