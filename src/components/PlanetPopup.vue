<template>
  <div>
    {{ planetName }}
  </div>
</template>


<script>
export default {
  props: ['id'],
  computed: {
    planet() {
      return this.$store.state.planets[this.id];
    },
    planetName() {
      return this.planet?.name ?? 'Loading...';
    }
  },
  mounted() {
    this.$store.dispatch('loadPlanetIfMissing', {id: this.id});
  },
}
</script>


<style scoped>

</style>
