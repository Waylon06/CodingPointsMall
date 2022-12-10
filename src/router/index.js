import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PubSub from "pubsub-js";

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('@/views/Goods')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import("@/views/User"),
    redirect: '/user/cart',
    children: [
      {
        path: 'cart',
        name: 'cart',
        component: () => import("@/components/User/CommonCart")
      },
      {
        path: '/discount',
        name: 'discount',
        component: () => import('@/components/User/CommonDiscount')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order')
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

router.beforeEach((to, from, next) => {
  if (to.path == '/user' || to.path == '/order' || to.path == '/discount') {
    if (sessionStorage.getItem('token')) {
      next();
    } else {
      alert('请先登录');
      PubSub.publish("isShow", true);
    }
  } else {
    next();
  }
})

export default router
