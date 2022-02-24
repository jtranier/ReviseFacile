<!--
  - Copyright Toulouse INP - inp@toulouse-inp.fr - 22/02/2022
  -
  - contributor(s) :
  -  Jean-François Parmentier (jean-francois.parmentier@toulouse-inp.fr)
  -  John Tranier (john.tranier@ticetime.com)
  -
  - This software is governed by the CeCILL-B license under French law and
  - abiding by the rules of distribution of free software.  You can  use,
  - modify and/ or redistribute the software under the terms of the CeCILL-B
  - license as circulated by CEA, CNRS and INRIA at the following URL
  - "http://www.cecill.info".
  -
  - As a counterpart to the access to the source code and  rights to copy,
  - modify and redistribute granted by the license, users are provided only
  - with a limited warranty  and the software's author,  the holder of the
  - economic rights,  and the successive licensors  have only  limited
  - liability.
  -
  - In this respect, the user's attention is drawn to the risks associated
  - with loading,  using,  modifying and/or developing or reproducing the
  - software by the user in light of its specific status of free software,
  - that may mean  that it is complicated to manipulate,  and  that  also
  - therefore means  that it is reserved for developers  and  experienced
  - professionals having in-depth computer knowledge. Users are therefore
  - encouraged to load and test the software's suitability as regards their
  - requirements in conditions enabling the security of their systems and/or
  - data to be ensured and,  more generally, to use and operate it in the
  - same conditions as regards security.
  -
  - The fact that you are presently reading this means that you have had
  - knowledge of the CeCILL-B license and that you accept its terms.
  -->

<template>

  <div class="container">
    <router-link :to="{ name: 'CourseView', params: { courseId } }"
                 custom
                 v-slot="{ navigate }">
      <div class="bouton-retour" @click="navigate">
        <h5>&lt;</h5>
      </div>

    </router-link>

    <h5 style="text-align:center; margin-top: 3%;">Ajouter un quiz au cours "{{ course.name }}"</h5>

    <hr style="margin-bottom: 2rem">

    <router-link
        :to="{ name: 'MoodleQuizUploadForm', query: { courseId: courseId } }"
        custom
        v-slot="{ navigate  }">
      <button @click="navigate" class="button-primary u-full-width">
        Importer un quiz Moodle
      </button>
    </router-link>

    <quiz-list :quiz-list="quizList"
               :courseId="courseId"
               v-on:add-quiz-to-course="addQuizToCourse"
               :mode-add-quiz="true"/>
  </div>

</template>

<script>
import QuizService from '@/services/QuizService';
import QuizList from '@/views/quiz/QuizList';
import CourseService from '@/services/CourseService';
import router from '@/router';

export default {
  name: 'course-add-quiz-view',
  components: {
    'quiz-list': QuizList,
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      course: {
        name: '',
      },
      quizList: [],
    };
  },
  created() {

    CourseService.get(this.courseId).then(res => {
      this.course = res.data;
    }).catch(error => {
      console.error(error);
    });

    QuizService.findAllMyQuiz().then(quizList => {
      this.quizList = quizList.slice().sort((a, b) => b.date - a.date);
    }).catch(console.error);
  },
  methods: {
    addQuizToCourse(quizId) {
      CourseService.addQuiz(this.courseId, quizId).then(() => {
        router.push(`/teacher/course/${this.courseId}`);
      }).catch(error => {
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>

</style>