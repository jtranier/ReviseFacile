import Vue from 'vue'
import VueRouter from 'vue-router'
import CourseView from '@/views/course/CourseView';
import TeacherView from '@/views/TeacherView';
import HomeView from '@/views/HomeView';
import QuizView from '@/views/quiz/QuizView';
import QuizListView from '@/views/quiz/QuizListView';
import MoodleQuizUploadForm from '@/views/quiz/MoodleQuizUploadForm';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

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
    component: CourseView,
    props: true
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
  {
    path: '/teacher/quiz',
    name: 'QuizListView',
    component: QuizListView,
  },
  {
    path: '/teacher/moodle-upload',
    name: 'MoodleQuizUploadForm',
    component: MoodleQuizUploadForm,
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
})

export default router
