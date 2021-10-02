<template>
  <div>
    <training-list-item v-for="training in trainingList"
                        v-bind:key="`training-${training.quizId}`"
                        :course-id="courseId"
                        :quiz-id="training.quizId"
                        :quiz-title="training.quizTitle"
                        :quiz-date="training.quizDate"
                        :last-training-current-question="training.lastTrainingCurrentQuestion"
                        :quiz-nb-questions="training.quizNbQuestions"
                        :score="training.score" />

  </div>
</template>

<script>
import TrainingListItem from '@/views/training/TrainingListItem';

export default {
  name: 'TrainingList',
  components: {
    'training-list-item': TrainingListItem,
  },
  props: {
    courseId: [Number, String],
    'trainingList': Array,
  },
};
</script>

<style scoped>

</style>