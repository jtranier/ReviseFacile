<template>
  <div>
    <div class="bouton-reponse u-full-width"
         v-bind:class="{
        'bouton-vert': scoreColor === 'correct',
        'bouton-jaune': scoreColor === 'partially-correct',
        'bouton-orange': scoreColor === 'incorrect',
      }">
      <span v-html="text"></span>


    </div>
    <small v-html="feedback"></small>
  </div>
</template>

<script>

export default {
  name: 'answer',
  props: {
    text: String,
    feedback: String,
    scoreFraction: Number,
    multichoice: Boolean,
  },
  computed: {
    scoreColor() {
      if (this.scoreFraction === 100 || (this.multichoice && this.scoreFraction > 0)) {
        return 'correct';
      }

      if (this.scoreFraction <= 0) {
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