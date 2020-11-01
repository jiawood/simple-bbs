import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Home,
    redirect: '/home/total'
  },
  {
    path: '/home/:path',
    name: 'home',
    component: Home
  },
  {
    //设置回复页面
    path: '/comments/:id',
    name: 'comments',
    component: () => import('views/PostComments.vue')
  },
  {
    //注册
    path: '/register',
    component: () => import('views/UserRegister.vue')
  },
  {
    path: '/login',
    component: () => import('views/UserLogin.vue')
  },
  //发帖
  {
    path: '/post',
    component: () => import('views/CreatePost.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
