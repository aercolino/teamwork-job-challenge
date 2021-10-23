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
      <tr v-for="i in rows" :key="i">
        <td>
          Luke Skywalker
        </td>
        <td>
          172
        </td>
        <td>
          77
        </td>
        <td>
          2014-12-09T13:50:51.644000Z
        </td>
        <td>
          2014-12-20T21:17:56.891000Z
        </td>
        <td>
          <PlanetPopup id="1"/>
        </td>
      </tr>
    </table>
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
      rows: Array(10).fill(null),
    }
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
