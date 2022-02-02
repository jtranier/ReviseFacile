/*
 * Copyright [name of the author when individual or of the
 * legal entity when the software has been created under wage-earning status
 * adding underneath, if so required :" contributor(s) : [name of the
 * individuals] ([date of creation])
 *
 * [e-mail of the author(s)]
 *
 * This software is a computer program whose purpose is to [describe
 * functionalities and technical features of your software].
 *
 * This software is governed by the [CeCILL|CeCILL-B|CeCILL-C] license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the [CeCILL|CeCILL-B|CeCILL-C]
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-B license and that you accept its terms.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
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
import UuidView from '@/views/user/UuidView';
import UserService from '@/services/UserService';
import PageNotFound from '@/views/PageNotFound';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const ifTeacher = (to, from, next) => {
  if(UserService.isTeacher(router.app.$cookies)) {
    next();
  }
  else next({
    name: 'UuidView',
    query: { needTeacherAccess: true},
  });
};

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/teacher',
    name: 'TeacherView',
    component: TeacherView,
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/course/:courseId',
    name: 'CourseView',
    component: CourseView,
    props: true,
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/course/:courseId/quiz/:quizId/results',
    name: 'QuizResultsView',
    component: QuizResultsView,
    props: true,
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/course/:courseId/add-quiz-action',
    name: 'CourseAddQuizAction',
    component: CourseAddQuizView,
    props: true,
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/quiz/:quizId',
    redirect: '/teacher/quiz/:quizId/question/1',
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/quiz/:quizId/question/:questionIndex',
    name: 'QuizView',
    component: QuizView,
    props: true,
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/course/:courseId/quiz/:quizId/question/:questionIndex',
    name: 'SingleQuestionView',
    component: SingleQuestionView,
    props: true,
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/course/:courseId/quiz/:quizId',
    name: 'CourseQuizView',
    redirect: '/teacher/course/:courseId/quiz/:quizId/question/1',
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/course/:courseId/quiz/:quizId/question/:questionIndex',
    component: QuizView,
    props: true,
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/quiz',
    name: 'QuizListView',
    component: QuizListView,
    beforeEnter: ifTeacher,
  },
  {
    path: '/teacher/moodle-upload',
    name: 'MoodleQuizUploadForm',
    component: MoodleQuizUploadForm,
    beforeEnter: ifTeacher,
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
  {
    path: '/uuid',
    name: 'UuidView',
    component: UuidView,
    props: {
      aze: false
    }
  },
  {
    path: '*',
    component: PageNotFound
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to) {
    if(to.hash) {
      return { selector: to.hash}
    }
    else return {x: 0, y: 0}
  },
})

export default router
