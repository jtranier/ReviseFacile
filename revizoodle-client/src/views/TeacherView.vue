<template>
  <course-list :value="courseList" v-on:create-course="createCourse" />
</template>

<script>
import CourseList from '@/views/course/CourseList';
import CourseService from '@/services/CourseService';


export default {
  name: 'TeacherView',
  components: { 'course-list': CourseList },
  data: () => ({
    courseList: [],
  }),
  created() {
    CourseService.findAllMyCourse()
    .then(res => {
      this.courseList = res.data
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    createCourse: function(name) {

      CourseService.create(name)
      .then(data => {
        this.courseList.unshift(data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
};
</script>

<style scoped>

</style>