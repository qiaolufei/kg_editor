import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('../pages/index.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
