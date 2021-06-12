import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/styles/font-Raleway.css'
import './assets/styles/normalize.css'
import './assets/styles/skeleton.css'
import './assets/styles/extensionBoutons.css'
import './assets/styles/boutonsAdele.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
