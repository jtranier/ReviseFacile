<template>
  <div class="container" align="justify">

    <div style="margin-top: 3%;">
      <h5 style="text-align:center">{{ course.name }}</h5>
    </div>

    <!-- TODO: Uncomment this when add Quiz is implemented -->
    <!--    <hr style="margin-bottom: 2rem">-->
    <!--    <button class="button-primary u-full-width" onclick="initialisePageAjoutQuestionnaire();">Ajouter</button>-->

    <course-quiz-list :quiz-list="quizList" />

  </div>
</template>

<script>
import CourseQuizList from '@/views/quiz/CourseQuizList';
import moment from 'moment';

export default {
  name: 'course-view',
  components: {
    'course-quiz-list': CourseQuizList
  },
  data() {
    return {
      course: {
        id: this.$route.params.courseId,
        name: 'Test course',
        date: new Date()
      },
      quizList: [
        {
          id: 1,
          name: 'Aérodynamique',
          date: moment('13/01/2021', 'DD/MM/YYYY').toDate(),
          nbQuestions: 8,
        },
        {
          id: 2,
          name: 'Introduction mécanique L1',
          date: moment('01/09/2020', 'DD/MM/YYYY').toDate(),
          nbQuestions: 13,
        },
      ]
    }
  },
};
</script>

<style scoped>

</style>