<template>
  <div class="container" align="justify" style="margin-top: 1em">
    <div class="row">
      <div class="two-thirds column">
        <h4 style="margin-bottom: 1em">Mes cours</h4>
      </div>
      <div class="one-third column">
        <button class="button-primary u-full-width"
                v-on:click="showCreateForm"
                v-show="!createFormVisible">
          Créer
        </button>
      </div>
    </div>

    <course-create-form v-show="createFormVisible"
                        @hide="hideCreateForm"
                        v-on:create-course="createCourse"/>

    <template v-if="!sortedCourseList || !sortedCourseList.length">
      <p>Vous n'avez créé aucun cours.</p>
    </template>

    <template v-if="sortedCourseList && sortedCourseList.length">
      <hr/>
      <table class="u-full-width">
        <tbody>

        <course-list-item v-for="course in sortedCourseList"
                          v-bind:key="'course-'+course.id"
                          :name="course.name"
                          :id="course.id"
                          :date="course.date"></course-list-item>
        </tbody>
      </table>

      <hr/>
    </template>

  </div>

</template>


<script>
import CourseListItem from '@/views/course/CourseListItem';
import CourseCreateForm from '@/views/course/CourseCreateForm';

export default {
  name: 'course-list',
  components: {
    'course-create-form': CourseCreateForm,
    'course-list-item': CourseListItem,
  },
  data() {
    return {
      'createFormVisible': false,
    };
  },
  props: {value: Array}, // List of courses {id, name, date}
  computed: {
    sortedCourseList: function() {
      return this.value.slice().sort((a, b) => b.updatedAt - a.updatedAt);
    },
  },
  methods: {
    showCreateForm: function() {
      this.createFormVisible = true;
    },
    hideCreateForm: function() {
      this.createFormVisible = false;
    },
    createCourse(name) {
      this.$emit('create-course', name);
    },
  },
};
</script>

<style scoped>

</style>