import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import { v4 as uuidv4 } from 'uuid';
import http from './http-commons';

import './assets/styles/font-Raleway.css'
import './assets/styles/normalize.css'
import './assets/styles/skeleton.css'
import './assets/styles/extensionBoutons.css'
import './assets/styles/boutonsAdele.css'

Vue.config.productionTip = false

Vue.use(VueCookies)

new Vue({
  router,
  render: h => h(App),
  created() {
    if(this.$cookies.get('uuid') === null) {
      this.$cookies.set('uuid', uuidv4(), Infinity)
    }

    // Set the uuid permanently into the header
    http.defaults.headers.uuid = this.$cookies.get('uuid');
  },
}).$mount('#app')
