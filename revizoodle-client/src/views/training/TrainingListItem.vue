<template>
  <div>
    <table class="u-full-width">
      <tbody>
      <tr>
        <th>{{ quizTitle }}</th>
        <td style="text-align: right;"><strong>{{ displayedScore }}</strong></td>
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
                     :to="{ name: 'PlayQuiz', params: { courseId: 1, quizId: quizId, questionIndex: 1 } }"
                     custom
                     v-slot="{ navigate }">
          <button @click="navigate"  class="button-warning u-full-width">
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
    quizTitle: String,
    quizDate: Date,
    quizNbQuestions: Number,
    score: Number,
  },
  computed: {
    displayedScore() {
      return this.score === null ? "Incomplet" : `Score : ${this.score}%`
    }
  },
  methods: {
    moment,
    redoTraining() {
      TrainingService.redoTraining(this.quizId)
      .then(() => {
        this.$router.push({
          name: 'PlayQuiz',
          // TODO *** update the courseId here & upward
          params: { courseId: 1, quizId: this.quizId, questionIndex: 1 }
        });
      }).catch(console.error);
    },
  }
};
</script>

<style scoped>

</style>