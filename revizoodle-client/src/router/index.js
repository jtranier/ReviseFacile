import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Teacher from '@/views/Teacher';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: Teacher
  },
]

const router = new VueRouter({
  routes
})

export default router
