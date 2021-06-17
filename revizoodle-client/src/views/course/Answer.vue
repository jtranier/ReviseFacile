<template>
  <div>
    <div class="bouton-reponse u-full-width" v-bind:class="{'bouton-vert': correct}" v-html="text"></div>
    <small v-html="feedback"></small>
  </div>
</template>

<script>
export default {
  name: 'answer',
  props: {
    text: String,
    feedback: String,
    correct: Boolean
  }
};
</script>

<style scoped>

</style>