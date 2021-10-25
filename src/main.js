import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.filter('asLogTime', function asLogTime(isoTime = '') {
  if (!isoTime) return;
  if (!/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d+Z$/.test(isoTime)) return isoTime;
  // 2014-12-10T11:35:48.479000Z -> 2014-12-10 11:35 UTC
  const upToMinutes = isoTime.substr(0, 16).replace('T', ' ');
  return `${upToMinutes} UTC`;
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
