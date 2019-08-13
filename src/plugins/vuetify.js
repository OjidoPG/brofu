import Vue from 'vue';
import Vuetify, {VSnackbar, VBtn, VIcon} from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify);
Vue.component('v-snackbar', VSnackbar)
Vue.component('v-icon', VIcon)
Vue.component('v-btn', VBtn)
Vue.use(VuetifyToast, {
  x: 'center', // default
  y: 'top', // default
  color: 'info', // default
  icon: 'fa fa-home',
  classes: [
    'body-2'
  ],
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  }
});
