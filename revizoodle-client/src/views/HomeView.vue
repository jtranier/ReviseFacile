<template>
  <div class="container" style="margin-top: 5%">
    <h2 class="title" style="text-align: center">ReviZoodle</h2>
    <div class="row">
      <div class="one-half column" style="text-align:center; margin-top: 1rem; padding: 1rem;">
        <h4>Enseignants</h4>
        <hr>
        <ul>
          <li>Importez vos QCM Moodle</li>
          <li>Entrainez vos étudiants facilement</li>
          <li>Consultez les résultats en 1 clin d'oeil</li>
          <li>100% RGPD</li>
        </ul>
        <router-link class="button button-primary u-full-width" to="/teacher">Accès enseignant</router-link>
        <hr>
      </div>
      <div class="one-half column" style="text-align:center; margin-top: 1rem; padding: 1rem;">
        <h4>Étudiants</h4>
        <hr>
        <ul>
          <li>Répondez aux questions de vos enseignants</li>
          <li>Une interface simple et claire</li>
          <li>Entrainez-vous encore et encore</li>
          <li>100% RGPD</li>
        </ul>
        <router-link class="button button-primary u-full-width" to="/etudiant">Accès étudiant</router-link>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {}
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>