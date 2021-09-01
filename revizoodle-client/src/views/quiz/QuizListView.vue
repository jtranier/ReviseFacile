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

  },
};
</script>

<style scoped>

</style>