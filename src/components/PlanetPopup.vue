<template>
  <div>
    {{ planetName }}
    <button
      type="button"
      class="btn"
      @click="showModal"
    >
      Open Modal!
    </button>

    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    />
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
</style>
