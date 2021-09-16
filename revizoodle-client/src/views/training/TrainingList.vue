<template>
  <div>
    <training-list-item v-for="training in trainingList"
                        v-bind:key="`training-${training.quizId}`"
                        :quiz-id="training.quizId"
                        :quiz-title="training.quizTitle"
                        :quiz-date="training.quizDate"
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
    'trainingList': Array,
  },
};
</script>

<style scoped>

</style>