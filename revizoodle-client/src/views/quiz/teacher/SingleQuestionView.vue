<template>

  <div class="container">
    <div style="margin-top: 3%;">
      <router-link :to="{
        name: 'QuizResultsView',
        params: { courseId: this.courseId, quizId: this.quizId }
      }"
                   custom
                   v-slot="{ navigate }">
        <div class="bouton-retour" @click="navigate">
          <h5>&lt;</h5>
        </div>
      </router-link>

      <h5 style="text-align:center">Question {{ currentQuestionIndex }} / {{ nbQuestions }}</h5>
    </div>

    <question v-bind="currentQuestion"/>
  </div>

</template>

<script>
import Question from '@/views/quiz/teacher/Question';
import QuizService from '@/services/QuizService';

export default {
  name: 'single-quiz-view',
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
    };
  },
  created() {
    if (this.courseId) {
      this.backRouterLink = {
        name: 'CourseAddQuizAction',
        params: {
          courseId: this.courseId,
        },
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
  },
};
</script>

<style scoped>

</style>