<template>
  <course-list :value="courseList" v-on:create-course="createCourse" />
</template>

<script>
import CourseList from '@/views/course/CourseList';
import moment from 'moment';
import CourseService from '@/services/CourseService';


export default {
  name: 'TeacherView',
  components: { 'course-list': CourseList },
  data: () => ({
    idSeq: 3,
    courseList: [
      {
        id: 1,
        name: '1S1',
        date: moment("01/09/2020", "DD/MM/YYYY").toDate(),
      },
      {
        id: 2,
        name: 'Terminale L',
        date: moment("13/01/2021", "DD/MM/YYYY").toDate(),
      },

    ],
  }),
  created() {
    CourseService.findAllMyCourse()
    .then(res => {
      console.log(res.data)
      this.courseList = res.data
    })
    .catch(error => {
      console.log(error)
    })
  },
  methods: {
    createCourse: function(name) {
      this.courseList.push({
        id: this.idSeq++,
        name: name,
        date: new Date()
      })
    }
  }
};
</script>

<style scoped>

</style>