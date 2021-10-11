<template>
  <div>
    <table class="u-full-width">
      <tbody>
      <tr>
        <th>{{ quizTitle }}</th>
        <td style="text-align: right; min-width: 9em;"><strong>{{ displayedStatus }}</strong></td>
      </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="two-thirds column">
        <table class="u-full-width">
          <tbody>
          <tr>
            <td>{{ moment(quizDate).format('L') }}</td>
            <td>{{ quizNbQuestions }} question(s)</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="one-third column">
        <router-link v-if="score === null"
                     :to="{ name: 'PlayQuiz', params: { courseId: courseId, quizId: quizId, questionIndex: 1 } }"
                     custom
                     v-slot="{ navigate }">

          <button @click="navigate"
                  v-if="lastTrainingCurrentQuestion == null"
                  class="button-primary u-full-width">
            Démarrer
          </button>

          <button @click="navigate"
                  v-else
                  class="button-warning u-full-width">
            Continuer
          </button>
        </router-link>

        <button v-if="score !== null"
                class="button-primary u-full-width"
                @click="redoTraining">
          Refaire
        </button>
      </div>
    </div>

    <hr/>
  </div>

</template>

<script>
import moment from 'moment';
import TrainingService from '@/services/TrainingService';

export default {
  name: 'training-list-item',
  props: {
    quizId: [Number, String],
    courseId: [Number, String],
    quizTitle: String,
    quizDate: Date,
    lastTrainingCurrentQuestion: Number,
    quizNbQuestions: Number,
    score: Number,
  },
  computed: {
    displayedStatus() {
      if (this.lastTrainingCurrentQuestion === null) {
        return 'Non démarré';
      }
      return this.score === null ?
          `Avancement : ${this.lastTrainingCurrentQuestion + 1}/${this.quizNbQuestions}` :
          `Score : ${this.score}%`;
    },
  },
  methods: {
    moment,
    redoTraining() {
      TrainingService.redoTraining(this.quizId).then(() => {
        this.$router.push({
          name: 'PlayQuiz',
          params: {courseId: this.courseId, quizId: this.quizId, questionIndex: 1},
        });
      }).catch(console.error);
    },
  },
};
</script>

<style scoped>

</style>