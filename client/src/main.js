import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import './assets/app.scss';
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:3000';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
