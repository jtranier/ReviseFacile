<template>
  <div>
    <vue-mathjax :formula="statement" :safe="false"/>

    <div v-for="(answer, index) in answers" :key="'answer-'+index">
      <answer :text="answer.text"
              :score-fraction="answer.scoreFraction"
              :multichoice="type === 'multichoice'"
              :feedback="answer.feedback"/>
    </div>

    <template v-if="explanation">
      <p><strong>Explication :</strong></p>
      <vue-mathjax :formula="explanation" :safe="false"/>
    </template>

  </div>
</template>

<script>
import Answer from '@/views/quiz/Answer';
import {VueMathjax} from 'vue-mathjax';

export default {
  name: 'question',
  components: {
    Answer,
    'vue-mathjax': VueMathjax,
  },
  props: {
    statement: String,
    answers: Array,
    explanation: String,
    type: String,
  },
};
</script>

<style scoped>

</style>