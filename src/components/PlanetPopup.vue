<template>
  <div>
    <button
      type="button"
      class="btn"
      @click="showModal"
    >
      {{ planetName }}
    </button>

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
              {{ planet.diameter }}
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
              Popultion
            </th>
            <td>
              {{ planet.population }}
            </td>
          </tr>
          <tr>
            <th>
              Created
            </th>
            <td>
              {{ planet.created }}
            </td>
          </tr>
          <tr>
            <th>
              Edited
            </th>
            <td>
              {{ planet.edited }}
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
