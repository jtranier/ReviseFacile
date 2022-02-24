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
        this.mean1stTry = Math.round(
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