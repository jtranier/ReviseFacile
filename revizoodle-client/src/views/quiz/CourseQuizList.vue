<template>

  <div>

    <hr/>

    <p v-if="sortedQuizList.length === 0">Ce cours ne contient aucun quiz pour l'instant.</p>

    <course-quiz-list-item v-for="quiz in sortedQuizList"
                    v-bind:key="'quiz'+quiz.id"
                    :id="quiz.id"
                    :name="quiz.name"
                    :date="quiz.updatedAt"
                    :nb-questions="quiz.nbQuestions"/>

    <hr/>
  </div>

</template>


<script>
import CourseQuizListItem from '@/views/quiz/CourseQuizListItem';
import moment from 'moment';

export default {
  name: 'course-quiz-list',
  components: {
    'course-quiz-list-item': CourseQuizListItem,
  },
  props: {
    'quiz-list': Array, // List of quiz {id, name, date, nbQuestions}
  },
  computed: {
    sortedQuizList() {
      return this.quizList
      .map(quiz => {

        return {
          ...quiz,
          updatedAt: moment(quiz.updatedAt).toDate(),
        }
      })
      .slice().sort((a, b) => b.updatedAt - a.updatedAt);
    },
  },
};
</script>

<style scoped>

</style>