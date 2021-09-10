<template>

  <div class="container" style="margin-top: 1em">
    <div class="row">
      <div class="two-thirds column">
        <h4 style="margin-bottom: 1em">Mes quiz</h4>
      </div>
      <div class="one-third column">
        <router-link tag="button"
                     to="/teacher/moodle-upload"
                     class="button-primary u-full-width">
          Importer
        </router-link>
      </div>
    </div>

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