<template>
  <div class="row">
    <form @submit.prevent="createCourse">
      <label for="inputCourseName">Nom :</label>
      <input class="u-full-width"
             type="text"
             placeholder="1A Phys1 S1"
             id="inputCourseName"
             v-model="newCourseName">
      <div class="vue" v-if="errorEmptyName">
        <p><em>Veuillez saisir un nom.</em></p>
      </div>
      <button class="button-success u-full-width" type="submit">Valider</button>
      <button class="button-warning u-full-width" v-on:click="hide">Annuler</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'course-create-form',
  data() {
    return {
      'newCourseName': '',
      'errorEmptyName': false
    };
  },
  methods: {
    createCourse: function() {
      // Check form constraints
      if(!this.newCourseName || this.newCourseName.trim() === '') {
        this.errorEmptyName = true;
      }
      else {
        const name = this.newCourseName;
        this.$emit('create-course', name);
        this.hide();
        this.newCourseName = '';
      }

    },
    hide() {
      this.$emit('hide')
    }
  }
};
</script>

<style scoped>

</style>