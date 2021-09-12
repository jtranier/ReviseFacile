<template>
  <div class="container">

    <div style="margin-top: 3%;">
      <router-link tag="div"
                   to="/teacher"
                   class="bouton-retour">
        <h5>&lt;</h5>
      </router-link>

      <h5 style="text-align:center">{{ course.name }}</h5>
    </div>

    <hr style="margin-bottom: 2rem">

    <router-link
        tag="button"
        class="button-primary u-full-width"
        :to="`/teacher/course/${course.id}/add-quiz-action`">
      Ajouter
    </router-link>

    <course-quiz-list :quiz-list="course.quizList"/>

  </div>
</template>

<script>
import CourseQuizList from '@/views/quiz/CourseQuizList';
import CourseService from '@/services/CourseService';

export default {
  name: 'course-view',
  components: {
    'course-quiz-list': CourseQuizList,
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    },
  },
  data() {
    return {
      course: {
        id: -1,
        teacherUuid: '',
        name: '',
        updatedAt: null,
        quizList: [],
      },
    };
  },
  created() {
    CourseService.get(this.courseId).then(response => {
      this.course = response.data;
    }).catch(error => {
      console.error(error);
    });
  },
};
</script>

<style scoped>

</style>