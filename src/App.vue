<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" style="height: 40px;">
    <PeopleList />
  </div>
</template>

<script>
import PeopleList from './components/PeopleList.vue'

export default {
  name: 'App',
  components: {
    PeopleList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
