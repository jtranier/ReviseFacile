<template>
  <teacher-course-list :value="courseList" v-on:create-course="createCourse" />
</template>

<script>
import TeacherCourseList from '@/views/course/TeacherCourseList';
import CourseService from '@/services/CourseService';


export default {
  name: 'TeacherView',
  components: { 'teacher-course-list': TeacherCourseList },
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