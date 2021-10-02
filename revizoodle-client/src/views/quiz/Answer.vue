<template>
  <div>
    <div class="bouton-reponse u-full-width"
         v-bind:class="{
        'bouton-vert': scoreColor === 'correct',
        'bouton-jaune': scoreColor === 'partially-correct',
        'bouton-orange': scoreColor === 'incorrect',
      }">
      <vue-mathjax :formula="text" :safe="false"/>
    </div>
    <small>
      <vue-mathjax :formula="feedback" :safe="false"/>
    </small>
  </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax';

export default {
  name: 'answer',
  props: {
    text: String,
    feedback: String,
    scoreFraction: Number,
    multichoice: Boolean,
  },
  components: {
    'vue-mathjax': VueMathjax,
  },
  computed: {
    scoreColor() {
      if (this.scoreFraction === 100 || (this.multichoice && this.scoreFraction > 0)) {
        return 'correct';
      }

      if (this.scoreFraction === 0) {
        return 'incorrect';
      }

      if (!this.multichoice && this.scoreFraction > 0) {
        return 'partially-correct';
      }

      return ''; // no color
    },
  },
};
</script>

<style scoped>

</style>