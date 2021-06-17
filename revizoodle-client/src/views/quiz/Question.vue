<template>
  <div>
    <span v-html="statement"></span>
    <div v-for="(answer, index) in answerList" :key="'answer-'+index" >
      <answer :text="answer"
              :correct="index === correctAnswerIndex"
              :feedback="feedbackList[index]"/>
    </div>
    <p><strong>Explication :</strong></p>
    <span v-html="explanation"></span>
    <p style="margin-top: 20px;"><strong>Aide :</strong></p>
    <span v-html="hint"></span>
  </div>
</template>

<script>
import Answer from '@/views/course/Answer';

export default {
  name: 'question',
  components: {Answer},
  props : {
    statement: String,
    correctAnswerIndex: Number,
    answerList: Array,
    feedbackList: Array,
    explanation: String,
    hint: String
  },
};
</script>

<style scoped>

</style>