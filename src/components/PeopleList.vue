<template>
  <div id="PeopleList">
    <h1>List of Star Wars People ({{ peopleResults }})</h1>
    <input class="search" type="text" placeholder="Search" @keyup.enter="search" v-model="searchQuery">
    <table width="100%">
      <tr>
        <th width="20%">
          Name
        </th>
        <th width="10%">
          Height
        </th>
        <th width="10%">
          Mass
        </th>
        <th width="20%">
          Created
        </th>
        <th width="20%">
          Edited
        </th>
        <th width="20%">
          Planet Name
        </th>
      </tr>
      <tr v-for="person in people" :key="person.url">
        <td>
          {{ person.name }}
        </td>
        <td>
          {{ person.height }}
        </td>
        <td>
          {{ person.mass }}
        </td>
        <td>
          {{ person.created | asLogTime }}
        </td>
        <td>
          {{ person.edited | asLogTime }}
        </td>
        <td>
          <PlanetPopup :id="person.homeworld"/>
        </td>
      </tr>
    </table>

    <p>
      <button @click="prevPage">PREV</button>
      Page {{ pageNumber }} of {{ pageCount }}
      <button @click="nextPage">NEXT</button>
    </p>
  </div>
</template>


<script>
import PlanetPopup from './PlanetPopup';

export default {
  name: 'PeopleList',
  components: {
    PlanetPopup,
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    people() {
      return this.$store.getters.currentPagePeople;
    },
    pageNumber() {
      return this.$store.state.currentPage;
    },
    pageCount() {
      return this.$store.state.pagesCount;
    },
    peopleResults() {
      return this.$store.state.peopleQuery ? `named like *${this.$store.state.peopleQuery}*` : 'all';
    },
  },
  methods: {
    prevPage() {
      this.$store.dispatch('navigateToPrevPage');
    },
    nextPage() {
      this.$store.dispatch('navigateToNextPage');
    },
    search() {
      this.$store.commit('setPeopleQuery', {query: this.searchQuery});
      this.$store.dispatch('loadNextPageOfPeople');
    },
  },
  mounted() {
    this.$store.dispatch('loadNextPageOfPeople');
  }
}
</script>


<style scoped>
#PeopleList {
  font-size: 14px;
}

input.search {
  margin-bottom: 15px;
}

table {
  border-collapse: collapse;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 14px 21px;
}
</style>
