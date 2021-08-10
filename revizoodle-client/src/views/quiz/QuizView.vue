<template>

  <div class="container" align="justify">
    <h5 style="text-align:center">Question {{ currentQuestionIndex }} / {{ nbQuestions }}</h5>
    <question v-bind="currentQuestion"/>

    <div style="margin-top: 3%;">
      <div class="row">
        <div class="one-half column">
          <router-link :to="'/teacher/quiz/'+quizId+'/question/'+previousIndex" tag="button" class="u-full-width">
            &lt;
          </router-link>
        </div>
        <div class="one-half column">
          <router-link :to="'/teacher/quiz/'+quizId+'/question/'+nextIndex" tag="button" class="u-full-width"> &gt;
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Question from '@/views/quiz/Question';
import QuizService from '@/services/QuizService';
import QuestionService from '@/services/QuestionService';

export default {
  name: 'quiz-view',
  components: {Question},
  props: {
    quizId: String,
    questionIndex: String,
  },
  data() {
    return {
      quiz: {
        questions: []
      },
    };
  },
  created() {
    QuizService.get(this.quizId).then(res => {
      // TODO Error handling when the quiz does not exist

      this.quiz = res.data;
      this.quiz.questions = this.quiz.questions.map(legacyQuestion => {
        return QuestionService.convertLegacyFormat(
            JSON.parse(legacyQuestion['contenu_json'])
        )
      })

    }).catch(e => {
      console.log(e);
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