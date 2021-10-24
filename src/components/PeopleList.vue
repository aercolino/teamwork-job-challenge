<template>
  <div id="PeopleList">
    <h1>List of Star Wars Peolple</h1>

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
      <tr v-for="person in people" :key="person.id">
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
          {{ person.created }}
        </td>
        <td>
          {{ person.edited }}
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
    }
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
  },
  methods: {
    prevPage() {
      this.$store.dispatch('navigateToPrevPage');
    },
    nextPage() {
      this.$store.dispatch('navigateToNextPage');
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

table {
  border-collapse: collapse;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 14px 21px;
}
</style>
