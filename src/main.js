import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from "vue-lazyload";

import 'reset-css'
import '@/assets/css/init.css'
import 'swiper'


Vue.prototype.imgUrl = 'https://sc.wolfcode.cn'
Vue.config.productionTip = false


Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
