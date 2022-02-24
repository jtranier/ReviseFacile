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
    <hr>
    <table class="u-full-width">
      <tbody>
      <tr>
        <th>{{ name }}</th>
      </tr>
      </tbody>
    </table>


    <div class="row" id="`quiz-${id}`" :ref="`quiz-${id}`">
      <div class="one-third column"><p style="text-align: center;">{{ nbQuestions }} questions</p></div>

      <div class="one-third column" v-if="!modeAddQuiz">&nbsp;</div>

      <div class="one-third column">
        <router-link :to="{ name: 'QuizView', params: { courseId, quizId: id, questionIndex: 1 } }"
                     custom
                     v-slot="{ navigate }">
          <button class="u-full-width" @click="navigate">
            Voir
          </button>
        </router-link>
      </div>
      <div class="one-third column" v-if="modeAddQuiz">
        <button class="button-primary u-full-width" v-on:click="addQuizToCourse">Choisir</button>
      </div>
    </div>

  </div>


</template>

<script>
import moment from 'moment';

export default {
  name: 'quiz-list-item',
  props: {
    courseId: {
      type: [Number, String],
      default: null,
    },
    id: Number,
    name: String,
    date: Date,
    nbQuestions: Number,
    modeAddQuiz: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    moment,
    addQuizToCourse() {
      this.$emit('add-quiz-to-course', this.id);
    },

  }
};
</script>

<style scoped>

</style>