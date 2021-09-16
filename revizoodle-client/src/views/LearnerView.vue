<template>
  <learner-course-list :value="courseList" />
</template>

<script>
import LearnerCourseList from '@/views/course/LearnerCourseList';
import TrainingService from '@/services/TrainingService';

export default {
  name: 'LearnerView',
  components: { 'learner-course-list': LearnerCourseList },
  data: () => ({
    courseList: [],
  }),
  created() {
    TrainingService.findAllMyRegisteredCourse()
    .then(courseList => {
      this.courseList = courseList;
    })
    .catch(console.error)
  },

};
</script>

<style scoped>

</style>