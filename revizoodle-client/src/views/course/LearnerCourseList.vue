<template>
  <div class="container" style="margin-top: 1em">
    <router-link to="/"
    custom
    v-slot="{ navigate }">
    <div class="bouton-retour" @click="navigate">
      <h5>&lt;</h5>
    </div>

    </router-link>
    <h5 style="text-align:center; margin-top: 3%;">Mes cours</h5>

    <template v-if="!sortedCourseList || !sortedCourseList.length">
      <p>Vous n'êtes abonné aucun cours.</p>
    </template>

    <template v-if="sortedCourseList && sortedCourseList.length">
      <hr/>
      <table class="u-full-width">
        <tbody>

        <learner-course-list-item v-for="course in sortedCourseList"
                                  v-bind:key="'course-'+course.id"
                                  :name="course.name"
                                  :id="course.id"
                                  :date="course.date"></learner-course-list-item>
        </tbody>
      </table>

      <hr/>
    </template>

  </div>

</template>


<script>
import LearnerCourseListItem from '@/views/course/LearnerCourseListItem';

export default {
  name: 'learner-course-list',
  components: {
    'learner-course-list-item': LearnerCourseListItem,
  },
  props: {value: Array}, // List of courses {id, name, date}
  computed: {
    sortedCourseList: function() {
      return this.value.slice().sort((a, b) => b.updatedAt - a.updatedAt);
    },
  },
};
</script>

<style scoped>

</style>