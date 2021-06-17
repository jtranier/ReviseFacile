<template>

  <div id="liste_questionnaires">

    <!-- TODO: handle no quiz cases -->

    <quiz-list-item v-for="quiz in sortedQuizList"
                    v-bind:key="'quiz'+quiz.id"
                    :id="quiz.id"
                    :name="quiz.name"
                    :date="quiz.date"
                    :nb-questions="quiz.nbQuestions"/>
  </div>

</template>


<script>
import QuizListItem from '@/views/quiz/QuizListItem';

export default {
  name: 'quiz-list',
  components: {
    'quiz-list-item': QuizListItem,
  },
  props: {
    'quiz-list': Array, // List of quiz {id, name, date, nbQuestions}
  },
  computed: {
    sortedQuizList() {
      return this.quizList.slice().sort((a, b) => b.date - a.date);
    },
  },
};
</script>

<style scoped>

</style>