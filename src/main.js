// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import newActivity from './newActivity'
import axios from 'axios'
import VueDataTimeM from 'vue-date-time-m'

Vue.use(VueDataTimeM)
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { newActivity },
  template: '<newActivity/>'
})
