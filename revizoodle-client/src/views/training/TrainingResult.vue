<template>
  <div class="container" style="margin-top: 10%">
    <h2>{{ trainingFeedback }}</h2>
    <p>Votre score est de <strong><span id="valeur_score_bilan">{{ score }}</span>%</strong>.
      Que voulez-vous faire ?</p>
    <button class="button-primary u-full-width" @click="redoTraining">Recommencer</button>
    <router-link to="/learner"
                 custom
                 v-slot="{ navigate }">
      <button @click="navigate" class="button u-full-width">Changer de thème</button>
    </router-link>

  </div>
</template>

<script>
import TrainingService from '@/services/TrainingService';

export default {
  name: 'training-result',
  props: {
    score: Number,
    quizId: [Number, String],
  },
  data() {
    return {
      trainingFeedback: ''
    }
  },
  created() {
    if(this.score < 50) {
      this.trainingFeedback = "C'est un bon début."
    } else if(this.score < 100) {
      this.trainingFeedback = "Bien joué."
    } else {
      this.trainingFeedback = "Bravo !"
    }
  },
  methods: {
    redoTraining() {
      TrainingService.redoTraining(this.quizId)
      .then(() => {
        this.$emit('restart-training')
      }).catch(console.error);
    }
  }
};
</script>

<style scoped>

</style>