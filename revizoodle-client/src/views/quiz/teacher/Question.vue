<template>
  <div ref="questionEl" class="question-container">
    <span v-html="statement"></span>

    <div v-for="(answer, index) in answers" :key="'answer-'+index">
      <answer :text="answer.text"
              :score-fraction="answer.scoreFraction"
              :multichoice="type === 'multichoice'"
              :feedback="answer.feedback"/>
    </div>

    <template v-if="explanation">
      <p style="margin-top: 2em;"><strong>Explication :</strong></p>
      <span v-html="explanation"></span>
    </template>

  </div>
</template>

<script>
import Answer from '@/views/quiz/Answer';

export default {
  name: 'question',
  components: {
    Answer,

  },
  props: {
    name: String,
    statement: String,
    answers: Array,
    explanation: String,
    type: String,
  },
  mounted() {
    this.renderMathJax();
  },
  updated() {
    this.renderMathJax();
  },
  methods: {
    renderMathJax() {
      window.MathJax.Hub.Queue([
        'Typeset',
        window.MathJax.Hub,
        this.$refs.questionEl
      ]);
    }
  },
};
</script>

<style scoped>

</style>