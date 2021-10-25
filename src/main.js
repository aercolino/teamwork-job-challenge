import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.filter('asLogTime', function asLogTime(isoTime = '') {
  if (!isoTime) return;
  // 2014-12-10T11:35:48.479000Z -> 2014-12-10 11:35 GMT
  const upToMinutes = isoTime.substr(0, 16).replace('T', ' ');
  return `${upToMinutes} GMT`;
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
