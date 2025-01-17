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
  <div class="question-container">
    <span v-html="statement"></span>

    <p v-if="type === 'multichoice'" style="font-style: italic; margin-bottom: 2em; margin-top: 1em;">
      Sélectionnez toutes les réponses correctes
    </p>

    <div v-for="(answer, index) in answers" :key="'answer-'+index">
      <choice :choice-index="index"
              :text="answer.text"
              :is-selected="learnerAnswer.choices[index]"
              :show-answer="learnerAnswer.submitted"
              :score-fraction="answer.scoreFraction"
              :feedback="answer.feedback"
              :multichoice="isMultipleChoice"
              v-on:selectChoice="selectChoice"
              v-on:unselectChoice="unselectChoice" />
    </div>

    <div style="margin-top: 3%;" v-if="learnerAnswer.submitted && (feedbacks.length > 0 || explanation)">
      <p><strong>Explication :</strong></p>
      <p v-for="(feedback, index) in feedbacks" v-bind:key="index" v-html="feedback"></p>
      <p v-html="explanation"></p>
    </div>

    <div style="margin-top: 3%;" v-if="!learnerAnswer.submitted">
      <div class="row">
        <button class="button-primary u-full-width" @click="submit">Soumettre</button>
      </div>
    </div>
  </div>
</template>

<script>
import Choice from '@/views/quiz/Choice';

export default {
  name: 'learner-question',
  components: {
    Choice,
  },
  props: {
    index: Number,
    statement: String,
    answers: Array,
    explanation: String,
    learnerAnswer: Object,
    type: String, // type of the question (multichoice, truefalse)
  },
  computed: {
    isMultipleChoice() {
      return this.type === 'multichoice';
    },
    feedbacks() {
      if(!this.learnerAnswer.submitted) return [];

      return this.answers.filter((answer, index) => {
        return this.learnerAnswer.choices[index] && answer.feedback
      }).map(answer => {
        return answer.feedback;
      });
    },
  },
  mounted() {
    this.renderMathJax();
  },
  updated() {
    this.renderMathJax();
  },
  methods: {
    selectChoice(index) {
      if(!this.isMultipleChoice) { // Reset previous choice
        this.answers.forEach((a, index) => {
          this.$set(this.learnerAnswer.choices, index, false);
        })
      }
      this.$set(this.learnerAnswer.choices, index, true);
    },

    unselectChoice(index) {
      if(!this.isMultipleChoice) {
        return;
      }

      this.$set(this.learnerAnswer.choices, index, false);
    },

    submit() {
      this.learnerAnswer.score = computeQuestionScore(this.answers, this.learnerAnswer, this.isMultipleChoice);

      this.$emit('submitLearnerAnswer' , this.learnerAnswer);
    },
    renderMathJax() {
      window.MathJax.Hub.Queue([
        'Typeset',
        window.MathJax.Hub,
        this.$refs.questionEl
      ]);
    }
  }
};

const computeQuestionScore = function(answers, learnerAnswer, isMultipleChoice) {

  const score = answers.reduce((acc, currentAnswer, index) => {
    return learnerAnswer.choices[index] ? acc + currentAnswer.scoreFraction : acc;
  }, 0);

  return isMultipleChoice ? Math.max(0, score) : score

}
</script>

<style scoped>

</style>