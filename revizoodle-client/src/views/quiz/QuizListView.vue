<template>

  <div class="container" align="justify">
    <h5 style="text-align:center">Mes quiz</h5>

    <quiz-list :quiz-list="quizList" />
  </div>

</template>

<script>
import QuizService from '@/services/QuizService';
import QuizList from '@/views/quiz/QuizList';

export default {
  name: 'quiz-list-view',
  components: {
    'quiz-list': QuizList
  },
  props: {
    courseId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      quizList: [],
    };
  },
  created() {
    QuizService.findAllMyQuiz()
    .then(res => {
      this.quizList = res.data;
    })
    .catch(error => {
      console.log(error)
    })
  },
  computed: {
    isAddQuizMode() {
      return this.courseId > 0;
    }
  },
};
</script>

<style scoped>

</style>