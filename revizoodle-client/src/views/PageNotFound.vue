<template>
  <div class="container" style="margin-top: 1em">
    <router-link to="/"
                 custom
                 v-slot="{ navigate }">
      <div class="bouton-retour" @click="navigate">
        <h5>&lt;</h5>
      </div>

    </router-link>
    <h5 style="text-align:center; margin-top: 3%;">Désolé... Cette page n'existe pas...</h5>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

<style scoped>

</style>