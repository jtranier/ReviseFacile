<template>

  <div class="container">
    <h5 style="text-align:center; margin-top: 3%;">Ajouter un quiz au cours "{{ course.name }}"</h5>

    <hr style="margin-bottom: 2rem">

    <router-link
        tag="button"
        class="button-primary u-full-width"
        :to="{ name: 'MoodleQuizUploadForm', query: { courseId: courseId } }">
      Importer un quiz Moodle
    </router-link>

    <quiz-list :quiz-list="quizList"
               v-on:add-quiz-to-course="addQuizToCourse"
               :mode-add-quiz="true" />
  </div>

</template>

<script>
import QuizService from '@/services/QuizService';
import QuizList from '@/views/quiz/QuizList';
import CourseService from '@/services/CourseService';
import router from '@/router';

export default {
  name: 'coure-add-quiz-view',
  components: {
    'quiz-list': QuizList
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      course: {
        name: '',
      },
      quizList: [],
    };
  },
  created() {

    CourseService.get(this.courseId)
    .then(res => {
      this.course = res.data;
    })
    .catch(error => {
      console.error(error);
    })

    QuizService.findAllMyQuiz()
    .then(quizList => {
      this.quizList = quizList.slice().sort((a, b) => b.date - a.date);
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    addQuizToCourse(quizId) {
      CourseService.addQuiz(this.courseId, quizId)
      .then(() => {
        router.push(`/teacher/course/${this.courseId}`);
      })
      .catch(error => {
        console.error(error);
      })
    }
  }
};
</script>

<style scoped>

</style>