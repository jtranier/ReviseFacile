<template>

  <div class="container" align="justify">
    <question v-bind="demoQuestion"/>
  </div>

</template>

<script>
import Question from '@/views/quiz/Question';

export default {
  name: 'quiz-view',
  components: {Question},
  data() {
    return {
      'demoQuestion': {
        'id': 31,
        'statement': '<p>Donnez la réponse la plus précise possible.</p><p>La suite $u$ définie pour tout entier $n$ par $u_n = (-1)^n$ est:</p>',
        'explanation': '<p>Cette suite est&nbsp;majorée part tout nombre supérieur ou égal à $1$ et&nbsp;minorée par tout nombre inférieur ou égal à $-1$. Elle est donc bornée.</p>',
        'correctAnswerIndex': 3,
        'answerList': ['majorée', 'minorée', 'bornée', 'aucun des trois'],
        'feedbackList': [
          '<p>oui tout à fait mais elle est aussi minorée par tout nombre inférieur ou égal à $-1$</p>',
          '<p>oui tout à fait mais elle est aussi majorée part tout nombre supérieur ou égal à $1$</p>',
          '',
          '<p>On peut commencer par remarquer que $\\forall n\\in\\mathbb{N},~u_n \\leq 1$, autrement dit $u_n$ est au moins majorée...</p>'],
        'hint': '<p>Je vous proposer de représenter graphiquement les 10 premiers termes de cette suite.</p>',
      },
    };
  },
};
</script>

<style scoped>

</style>