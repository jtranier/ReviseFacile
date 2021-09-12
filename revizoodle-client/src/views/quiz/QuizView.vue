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
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Question from '@/views/quiz/Question';
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
        }
      };
    }

    QuizService.get(this.quizId).then(res => {
      // TODO Error handling when the quiz does not exist

      this.quiz = res.data;

    }).catch(e => {
      console.error(e);
    });
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