<!--
  - Copyright Toulouse INP - inp@toulouse-inp.fr - 22/02/2022
  -
  - contributor(s) :
  -  Jean-François Parmentier (jean-francois.parmentier@toulouse-inp.fr)
  -  John Tranier (john.tranier@ticetime.com)
  -
  - This software is governed by the CeCILL-B license under French law and
  - abiding by the rules of distribution of free software.  You can  use,
  - modify and/ or redistribute the software under the terms of the CeCILL-B
  - license as circulated by CEA, CNRS and INRIA at the following URL
  - "http://www.cecill.info".
  -
  - As a counterpart to the access to the source code and  rights to copy,
  - modify and redistribute granted by the license, users are provided only
  - with a limited warranty  and the software's author,  the holder of the
  - economic rights,  and the successive licensors  have only  limited
  - liability.
  -
  - In this respect, the user's attention is drawn to the risks associated
  - with loading,  using,  modifying and/or developing or reproducing the
  - software by the user in light of its specific status of free software,
  - that may mean  that it is complicated to manipulate,  and  that  also
  - therefore means  that it is reserved for developers  and  experienced
  - professionals having in-depth computer knowledge. Users are therefore
  - encouraged to load and test the software's suitability as regards their
  - requirements in conditions enabling the security of their systems and/or
  - data to be ensured and,  more generally, to use and operate it in the
  - same conditions as regards security.
  -
  - The fact that you are presently reading this means that you have had
  - knowledge of the CeCILL-B license and that you accept its terms.
  -->

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
       class="bouton-reponse u-full-width" v-html="text">
    </a>
  </div>
</template>

<script>


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
  computed: {
    scoreColor() {
      if (!this.showAnswer) return null;

      if(this.scoreFraction === 100 || (this.multichoice && this.scoreFraction > 0)) {
        return 'correct';
      }

      if(this.isSelected && this.scoreFraction <= 0) {
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