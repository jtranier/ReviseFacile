import Vue from 'vue'
import VueRouter from 'vue-router'
import ClassroomView from '@/views/classroom/ClassroomView';
import TeacherView from '@/views/TeacherView';
import HomeView from '@/views/HomeView';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/teacher',
    name: 'TeacherView',
    component: TeacherView
  },
  {
    path: '/teacher/classroom/:classroomId',
    name: 'Classroom',
    component: ClassroomView
  },
]

const router = new VueRouter({
  routes
})

export default router
