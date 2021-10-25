<template>
  <div>
    <button
      type="button"
      class="btn"
      @click="showModal"
      v-if="planetName !== 'Loading...' && planetName !== 'unknown'"
    >
      {{ planetName }}
    </button>
    <template v-else>
      {{ planetName }}
    </template>

    <Modal
      v-show="isModalVisible"
      @close="closeModal"
      v-if="planet"
    >
      <template v-slot:header>
        <span class="header">{{ planet.name }}</span>
      </template>
      <template v-slot:body>
        <table width="100%">
          <tr>
            <th>
              Name
            </th>
            <td>
              {{ planet.name }}
            </td>
          </tr>
          <tr>
            <th>
              Diameter
            </th>
            <td>
              {{ planet.diameter | asNumber }}
            </td>
          </tr>
          <tr>
            <th>
              Climate
            </th>
            <td>
              {{ planet.climate }}
            </td>
          </tr>
          <tr>
            <th>
              Population
            </th>
            <td>
              {{ planet.population | inMegas }}
            </td>
          </tr>
          <tr>
            <th>
              Created
            </th>
            <td>
              {{ planet.created | asLogTime }}
            </td>
          </tr>
          <tr>
            <th>
              Edited
            </th>
            <td>
              {{ planet.edited | asLogTime }}
            </td>
          </tr>
        </table>
      </template>
      <template v-slot:footer />
    </Modal>
  </div>
</template>


<script>
import Modal from "./Modal.vue";

const numberFormatter = new Intl.NumberFormat("en-US");

export default {
  props: ["id"],
  components: {
    Modal,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  filters: {
    asNumber(quantity = 0) {
      const result = numberFormatter.format(quantity);
      return result;
    },
    asLogTime(isoTime = '') {
      if (!isoTime) return;
      // 2014-12-10T11:35:48.479000Z -> 2014-12-10 11:35 GMT
      const upToMinutes = isoTime.substr(0, 16).replace('T', ' ');
      return `${upToMinutes} GMT`;
    },
    inMegas(quantity = 0) {
      const kilos = Math.round(quantity / 1000);
      const megas = kilos / 1000;
      const result = numberFormatter.format(megas);
      return `${result} M`;
    },
  },
  computed: {
    planet() {
      return this.$store.state.planets[this.id];
    },
    planetName() {
      return this.planet?.name ?? "Loading...";
    },
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  mounted() {
    this.$store.dispatch("loadPlanetIfMissing", { id: this.id });
  },
};
</script>


<style scoped>
.header {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
