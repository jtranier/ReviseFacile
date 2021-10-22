<template>

  <div>

    <quiz-list-item v-for="quiz in sortedQuizList"
                    v-bind:key="'quiz'+quiz.id"
                    v-on:add-quiz-to-course="addQuizToCourse"
                    :courseId="courseId"
                    :id="quiz.id"
                    :name="quiz.name"
                    :date="quiz.date"
                    :nb-questions="quiz.nbQuestions"
                    :mode-add-quiz="modeAddQuiz" />

    <hr>
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
    courseId: {
      type: [Number, String],
      default: null,
    },
    'quiz-list': Array, // List of quiz {id, name, date, nbQuestions}
    'modeAddQuiz': {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    sortedQuizList() {
      return this.quizList.slice().sort((a, b) => b.date - a.date);
    },
  },
  methods: {
    addQuizToCourse(quizId) {
      this.$emit('add-quiz-to-course', quizId);
    },
  },
};
</script>

<style scoped>

</style>