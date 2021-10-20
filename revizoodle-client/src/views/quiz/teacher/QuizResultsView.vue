<template>
  <div class="container">
    <div style="margin-top: 3%;">
      <router-link :to="{ name: 'CourseView', params: { courseId } }"
                   custom
                   v-slot="{ navigate }">
        <div class="bouton-retour" @click="navigate">
          <h5>&lt;</h5>
        </div>

      </router-link>

      <h5 style="text-align:center">{{ quizName }}</h5>
    </div>
    <hr/>

    <div class="row">
      <div class="one-half column"><p><strong>Nombre de répondants : </strong>{{ nbLearners ? nbLearners : '-' }}</p>
      </div>
      <div class="one-half column"><p><strong>Nombre d'essais : </strong>{{ nbAttempts ? nbAttempts : '-' }}</p></div>
    </div>
    <p><strong>Moyenne (au premier essai) : </strong>{{ mean1stTry !== null ? `${mean1stTry} %` : '-' }}</p>

    <hr/>

    <table class="u-full-width">
      <tbody id="body_table_scores_questions">
      <tr v-for="(result1stAttemptQi, index) in results1stAttempt" v-bind:key="index">
        <th>Question {{ index + 1 }}</th>
        <td>{{ result1stAttemptQi !== null ? `${result1stAttemptQi} %` : '-' }}</td>
        <router-link :to="{ name: 'SingleQuestionView', params: {courseId, quizId, questionIndex: index + 1 }}" custom v-slot="{ navigate }">
          <td style="text-align: right;" class="bouton-avance" @click="navigate">&gt;</td>
        </router-link>
      </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
import QuizService from '@/services/QuizService';

export default {
  name: 'quiz-results-view',
  props: {
    courseId: [Number, String],
    quizId: [Number, String],
  },
  data() {
    return {
      quizName: 'loading...',
      nbLearners: null,
      nbAttempts: null,
      mean1stTry: null,
      results1stAttempt: [],
    };
  },
  created() {
    QuizService.getResults(this.quizId).then(quizResults => {
      this.quizName = quizResults.quizName;
      this.nbLearners = quizResults.nbLearners;
      this.nbAttempts = quizResults.nbAttempts;
      this.results1stAttempt = quizResults.results1stAttempt;


      if (this.results1stAttempt.length > 0 && quizResults.nbAttempts > 0) {
        this.mean1stTry = Math.floor(
            this.results1stAttempt.reduce((a, b) => {
              return a + b;
            }, 0) / this.results1stAttempt.length,
        );
      } else this.mean1stTry = null;
    }).catch(console.error);
  },
};
</script>

<style scoped>

</style>