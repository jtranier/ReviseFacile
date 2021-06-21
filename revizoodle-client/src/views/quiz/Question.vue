<template>
  <div>
    <vue-mathjax :formula="statement" :safe="false"/>

    <div v-for="(answer, index) in answerList" :key="'answer-'+index">
      <answer :text="answer"
              :correct="index === correctAnswerIndex"
              :feedback="feedbackList[index]"/>
    </div>

    <template v-if="explanation">
      <p><strong>Explication :</strong></p>
      <vue-mathjax :formula="explanation" :safe="false"/>
    </template>

    <template v-if="hint">
      <p style="margin-top: 20px;"><strong>Aide :</strong></p>
      <vue-mathjax :formula="hint" :safe="false"/>
    </template>
  </div>
</template>

<script>
import Answer from '@/views/course/Answer';
import {VueMathjax} from 'vue-mathjax';

export default {
  name: 'question',
  components: {
    Answer,
    'vue-mathjax': VueMathjax,
  },
  props: {
    statement: String,
    correctAnswerIndex: Number,
    answerList: Array,
    feedbackList: Array,
    explanation: String,
    hint: String,
  },
};
</script>

<style scoped>

</style>