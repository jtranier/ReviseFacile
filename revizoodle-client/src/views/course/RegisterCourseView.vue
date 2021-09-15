<template>
  <div class="container" style="margin-top: 5%">
    <h4>Inscription au cours</h4>
    <hr style="margin-bottom: 2em;" />
    <p v-if="state === 'loading'">Opération en cours...</p>
    <div v-if="state === 'error'">
      <p>Echec de l'inscription au cours.</p>
      <code>{{ error }}</code>
    </div>
    <hr/>
  </div>
</template>

<script>
import CourseService from '@/services/CourseService';

export default {
  name: 'RegisterCourseView',
  props: {
    courseId: [Number, String],
  },
  data() {
    return {
      state: 'loading',
      error: null
    }
  },
  created() {
    CourseService.register(this.courseId)
    .then(() => {
      this.state = 'done';

      this.$router.push({
        name: 'LearnerCourseView',
        params: {courseId: this.courseId}
      });
    })
    .catch(error => {
      this.state = 'error';
      this.error = error;
      console.error(error);
    });
  }
};
</script>

<style scoped>

</style>