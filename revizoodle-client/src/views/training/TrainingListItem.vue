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
        <button v-if="score === null" class="button-warning u-full-width">
          Continuer
        </button>
        <button v-if="score !== null" class="button-primary u-full-width">
          Refaire
        </button>
      </div>
    </div>

    <hr/>
  </div>

</template>

<script>
import moment from 'moment';

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
    moment
  }
};
</script>

<style scoped>

</style>