import Vue from 'vue'
import VueRouter from 'vue-router'
import CourseView from '@/views/course/CourseView';
import TeacherView from '@/views/TeacherView';
import HomeView from '@/views/HomeView';
import QuizView from '@/views/quiz/QuizView';

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
    path: '/teacher/course/:courseId',
    name: 'CourseView',
    component: CourseView
  },
  {
    path: '/teacher/quiz/:quizId',
    name: 'QuizView',
    component: QuizView
  },
]

const router = new VueRouter({
  routes
})

export default router
