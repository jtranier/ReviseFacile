<!--
  - Copyright Toulouse INP - inp@toulouse-inp.fr - 22/02/2022
  -
  - contributor(s) :
  -  Jean-François Parmentier (jean-francois.parmentier@toulouse-inp.fr)
  -  John Tranier (john.tranier@ticetime.com)
  -
  - This software is governed by the CeCILL-B license under French law and
  - abiding by the rules of distribution of free software.  You can  use,
  - modify and/ or redistribute the software under the terms of the CeCILL-B
  - license as circulated by CEA, CNRS and INRIA at the following URL
  - "http://www.cecill.info".
  -
  - As a counterpart to the access to the source code and  rights to copy,
  - modify and redistribute granted by the license, users are provided only
  - with a limited warranty  and the software's author,  the holder of the
  - economic rights,  and the successive licensors  have only  limited
  - liability.
  -
  - In this respect, the user's attention is drawn to the risks associated
  - with loading,  using,  modifying and/or developing or reproducing the
  - software by the user in light of its specific status of free software,
  - that may mean  that it is complicated to manipulate,  and  that  also
  - therefore means  that it is reserved for developers  and  experienced
  - professionals having in-depth computer knowledge. Users are therefore
  - encouraged to load and test the software's suitability as regards their
  - requirements in conditions enabling the security of their systems and/or
  - data to be ensured and,  more generally, to use and operate it in the
  - same conditions as regards security.
  -
  - The fact that you are presently reading this means that you have had
  - knowledge of the CeCILL-B license and that you accept its terms.
  -->

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