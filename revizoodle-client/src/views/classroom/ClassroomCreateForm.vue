<template>
  <div class="row">
    <form id="ajoute_classe" @submit.prevent="createClassroom">
      <label for="input_nom_classe">Nom :</label>
      <input class="u-full-width"
             type="text"
             placeholder="1A Phys1 S1"
             id="input_nom_classe"
             v-model="newClassroomName">
      <div class="vue" id="message_erreur_ajoute_classe" v-if="errorEmptyName">
        <p><em id="contenu_message_erreur_ajoute_classe">Veuillez saisir un nom.</em></p>
      </div>
      <button class="button-success u-full-width" type="submit">Valider</button>
      <button class="button-warning u-full-width" v-on:click="hide">Annuler</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'classroom-create-form',
  data() {
    return {
      'newClassroomName': '',
      'errorEmptyName': false
    };
  },
  methods: {
    createClassroom: function() {
      // Check form constraints
      if(!this.newClassroomName || this.newClassroomName.trim() === '') {
        this.errorEmptyName = true;
      }
      else {
        this.$emit('create-classroom', this.newClassroomName)
        this.hide();      }

    },
    hide() {
      this.$emit('hide')
    }
  }
};
</script>

<style scoped>

</style>