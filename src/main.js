import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://brob.local/";
axios.defaults.headers.common['Authorization'] = 'Bearer '+sessionStorage.getItem('JWT');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
