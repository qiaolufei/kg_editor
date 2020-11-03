import Vue from 'vue'
import App from './App'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store/store'
import qs from 'qs'
import '../static/reset.css'
import echarts from 'echarts'
import Print from 'vue-print-nb'

Vue.prototype.$echarts = echarts // 全局使用this.$echarts
Vue.use(elementUI)
Vue.prototype.$qs = qs // 可全局调用 this.$qs
Vue.use(Print) // 打印功能

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
