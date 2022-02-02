<!--
  - Copyright [name of the author when individual or of the
  - legal entity when the software has been created under wage-earning status
  - adding underneath, if so required :" contributor(s) : [name of the
  - individuals] ([date of creation])
  -
  - [e-mail of the author(s)]
  -
  - This software is a computer program whose purpose is to [describe
  - functionalities and technical features of your software].
  -
  - This software is governed by the [CeCILL|CeCILL-B|CeCILL-C] license under French law and
  - abiding by the rules of distribution of free software.  You can  use,
  - modify and/ or redistribute the software under the terms of the [CeCILL|CeCILL-B|CeCILL-C]
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
    <div style="margin-top: 3%;">
      <router-link :to="backRouterLink"
                   custom
                   v-slot="{ navigate }">
        <div class="bouton-retour" @click="navigate">
          <h5>&lt;</h5>
        </div>

      </router-link>

      <h5 style="text-align:center">Question {{ currentQuestionIndex }} / {{ nbQuestions }}</h5>
    </div>

    <question v-bind="currentQuestion"/>

    <div style="margin-top: 3%;">
      <div class="row">
        <div class="one-half column">
          <router-link v-if="questionIndex  > 1"
                       :to="'/teacher/quiz/'+quizId+'/question/'+previousIndex"
                       custom
                       v-slot="{ navigate }">
            <button class="u-full-width" @click="navigate">
              &lt;
            </button>
          </router-link>
          <button v-if="questionIndex  <= 1" class="u-full-width" disabled>
            &lt;
          </button>
          <div class="u-full-width">&nbsp;</div>
        </div>
        <div class="one-half column">
          <router-link v-if="questionIndex < nbQuestions"
                       :to="'/teacher/quiz/'+quizId+'/question/'+nextIndex"
                       custom
                       v-slot="{ navigate }">
            <button class="u-full-width" @click="navigate">
              &gt;
            </button>
          </router-link>
          <button v-if="questionIndex >= nbQuestions" class="u-full-width" disabled>
            &gt;
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Question from '@/views/quiz/teacher/Question';
import QuizService from '@/services/QuizService';

export default {
  name: 'quiz-view',
  components: {Question},
  props: {
    courseId: {
      type: [Number, String],
      default: null,
    },
    quizId: {
      type: [Number, String],
      required: true,
    },
    questionIndex: {
      type: [Number, String],
    },
  },
  data() {
    return {
      quiz: {
        name: '',
        questions: [],
      },
      backRouterLink: {
        name: 'QuizListView'
      }
    };
  },
  created() {
    if(this.courseId) {
      this.backRouterLink = {
        name: "CourseAddQuizAction",
        params: {
          courseId: this.courseId,
        },
        hash: `#quiz-${this.quizId}`
      };
    }

    QuizService.get(this.quizId).then(res => {
      this.quiz = res.data;
    }).catch(console.error);
  },
  computed: {
    currentQuestionIndex: function() {
      return Math.max(
          Math.min(this.questionIndex, this.nbQuestions),
          1,
      );
    },
    currentQuestion: function() {
      if (this.quiz && this.quiz.questions && this.quiz.questions.length) {
        return this.quiz.questions[this.currentQuestionIndex - 1];
      } else return null;
    },
    nbQuestions: function() {

      return this.quiz && this.quiz.questions ? this.quiz.questions.length : 0;
    },
    previousIndex: function() {
      return Math.max(this.currentQuestionIndex - 1, 1);
    },
    nextIndex: function() {
      return Math.min(this.currentQuestionIndex + 1, this.nbQuestions);
    },
  },
};
</script>

<style scoped>

</style>