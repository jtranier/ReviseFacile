import Vue from 'vue'
import VueRouter from 'vue-router'
import CourseView from '@/views/course/CourseView';
import TeacherView from '@/views/TeacherView';
import HomeView from '@/views/HomeView';
import QuizView from '@/views/quiz/teacher/QuizView';
import QuizListView from '@/views/quiz/QuizListView';
import MoodleQuizUploadForm from '@/views/quiz/MoodleQuizUploadForm';
import axios from 'axios';
import VueAxios from 'vue-axios';
import CourseAddQuizView from '@/views/quiz/CourseAddQuizView';
import LearnerView from '@/views/LearnerView';
import LearnerCourseView from '@/views/course/LearnerCourseView';
import RegisterCourseView from '@/views/course/RegisterCourseView';
import LearnerQuizView from '@/views/quiz/learner/LearnerQuizView';
import QuizResultsView from '@/views/quiz/teacher/QuizResultsView';
import SingleQuestionView from '@/views/quiz/teacher/SingleQuestionView';

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
    path: '/teacher/course/:courseId/quiz/:quizId/results',
    name: 'QuizResultsView',
    component: QuizResultsView,
    props: true
  },
  {
    path: '/teacher/course/:courseId/add-quiz-action',
    name: 'CourseAddQuizAction',
    component: CourseAddQuizView,
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
    path: '/teacher/course/:courseId/quiz/:quizId/question/:questionIndex',
    name: 'SingleQuestionView',
    component: SingleQuestionView,
    props: true
  },
  {
    path: '/teacher/course/:courseId/quiz/:quizId',
    name: 'CourseQuizView',
    redirect: '/teacher/course/:courseId/quiz/:quizId/question/1'
  },
  {
    path: '/teacher/course/:courseId/quiz/:quizId/question/:questionIndex',
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
  {
    path: '/learner',
    name: 'LearnerView',
    component: LearnerView
  },
  {
    path: '/learner/course/:courseId',
    name: 'LearnerCourseView',
    component: LearnerCourseView,
    props: true,
  },
  {
    path: '/learner/course/:courseId/register',
    name: 'RegisterCourse',
    component: RegisterCourseView,
    props: true,
  },
  {
    path: '/learner/course/:courseId/quiz/:quizId',
    name: 'PlayQuiz',
    component: LearnerQuizView,
    props: true,
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
})

export default router
