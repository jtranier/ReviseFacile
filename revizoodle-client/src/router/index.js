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
    redirect: '/teacher/quiz/:quizId/question/1',
  },
  {
    path: '/teacher/quiz/:quizId/question/:questionIndex',
    name: 'QuizView',
    component: QuizView,
    props: true
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
})

export default router
