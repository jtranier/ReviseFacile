<template>
  <learner-course-list :value="courseList" />
</template>

<script>
import LearnerCourseList from '@/views/course/LearnerCourseList';
import CourseService from '@/services/CourseService';


export default {
  name: 'LearnerView',
  components: { 'learner-course-list': LearnerCourseList },
  data: () => ({
    courseList: [],
  }),
  created() {
    CourseService.findAllMyRegisteredCourse()
    .then(courseList => {
      this.courseList = courseList;
    })
    .catch(error => {
      console.log(error)
    })
  },

};
</script>

<style scoped>

</style>