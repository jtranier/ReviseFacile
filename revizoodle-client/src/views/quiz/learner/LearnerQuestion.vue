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