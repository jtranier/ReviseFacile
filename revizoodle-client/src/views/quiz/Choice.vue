<template>
  <div>
    <a href="."
       @click="clickChoice"
       v-bind:class="{
        'bouton-selectionne': this.isSelected && !this.showAnswer,
        'bouton-vert': scoreColor === 'correct',
        'bouton-jaune': scoreColor === 'partially-correct',
        'bouton-orange': scoreColor === 'incorrect',
      }"
       class="bouton-reponse u-full-width">
      <vue-mathjax :formula="text" :safe="false"/>
    </a>
  </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax';

export default {
  name: 'choice',
  props: {
    choiceIndex: Number,
    text: String,
    showAnswer: Boolean,
    isSelected: Boolean,
    feedback: String,
    scoreFraction: Number,
    multichoice: Boolean,
  },
  components: {
    'vue-mathjax': VueMathjax,
  },
  computed: {
    scoreColor() {
      if (!this.showAnswer) return null;

      if(this.scoreFraction === 100 || (this.multichoice && this.scoreFraction > 0)) {
        return 'correct';
      }

      if(this.isSelected && this.scoreFraction === 0) {
        return 'incorrect';
      }

      if(this.isSelected && !this.multichoice && this.scoreFraction > 0) {
        return 'partially-correct';
      }

      return ''; // no color
    },
  },
  methods: {
    clickChoice(e) {
      e.preventDefault();
      if (this.showAnswer) {
        return;
      }

      this.isSelected ?
          this.$emit('unselectChoice', this.choiceIndex) :
          this.$emit('selectChoice', this.choiceIndex);
    },
  },
};
</script>

<style scoped>

</style>