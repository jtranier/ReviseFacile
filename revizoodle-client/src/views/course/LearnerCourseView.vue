<template>
  <div class="container">

    <div style="margin-top: 3%;">
      <router-link to="/learner"
                   custom
                   v-slot="{ navigate }">
        <div class="bouton-retour" @click="navigate">
          <h5>&lt;</h5>
        </div>

      </router-link>

      <h5 style="text-align:center"> Mes entraînements <br/>sur le cours "{{ course.name }}"</h5>
    </div>

    <hr style="margin-bottom: 2rem">

    <training-list :training-list="quizTrainingList" />

  </div>
</template>

<script>
import CourseService from '@/services/CourseService';
import TrainingService from '@/services/TrainingService';
import TrainingList from '@/views/training/TrainingList';

export default {
  name: 'course-view',
  components: {
    'training-list': TrainingList
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true,
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
      quizTrainingList: [],
    };
  },
  created() {
    // TODO should I use CourseService here ?
    CourseService.get(this.courseId).then(response => {
      this.course = response.data;
    }).catch(error => {
      console.error(error);
    });

    TrainingService.findAllTrainingsForCourse(this.courseId).then(data => {
      this.quizTrainingList = data;
    })
    .catch(error => {
      console.error(error);
    });
  },
};
</script>

<style scoped>

</style>