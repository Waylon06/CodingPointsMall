import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/goods',
    name:'goods',
    component: () => import('@/views/Goods')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import("@/views/User")
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order')
  },
  {
    path: '/discount',
    name: 'discount',
    component: () => import('@/views/Discount')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/Detail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
