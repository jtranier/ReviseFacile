<template>
  <div>
    <div class="bouton-reponse u-full-width" v-bind:class="{'bouton-vert': correct}">
      <vue-mathjax :formula="text" :safe="false" />
    </div>
    <small>
      <vue-mathjax :formula="feedback" :safe="false" />
    </small>
  </div>
</template>

<script>
import {VueMathjax} from 'vue-mathjax'

export default {
  name: 'answer',
  props: {
    text: String,
    feedback: String,
    correct: Boolean
  },
  components: {
    'vue-mathjax': VueMathjax
  }
};
</script>

<style scoped>

</style>