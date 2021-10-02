<template>
  <div class="question-container">
    <vue-mathjax :formula="statement" :safe="false"/>

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

    <div style="margin-top: 3%;" v-if="learnerAnswer.submitted && feedbacks.length > 0">
      <p><strong>Explication :</strong></p>
      <vue-mathjax v-for="(feedback, index) in feedbacks" v-bind:key="index" :formula="feedback" :safe="false"/>
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
import {VueMathjax} from 'vue-mathjax';

export default {
  name: 'learner-question',
  components: {
    Choice,
    'vue-mathjax': VueMathjax,
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
      this.learnerAnswer.score = computeQuestionScore(this.answers, this.learnerAnswer);
      this.$emit('submitLearnerAnswer' , this.learnerAnswer);
    },
  }
};

const computeQuestionScore = function(answers, learnerAnswer) {

  return answers.reduce((acc, currentAnswer, index) => {
    return learnerAnswer.choices[index] ? acc + currentAnswer.scoreFraction : acc;
  }, 0);
}
</script>

<style scoped>

</style>