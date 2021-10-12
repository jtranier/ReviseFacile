<template>
  <div class="container">
    <div style="margin-top: 3%;">
      <router-link to="/"
                   custom
                   v-slot="{ navigate }">
        <div class="bouton-retour" @click="navigate">
          <h5>&lt;</h5>
        </div>

      </router-link>

      <h5 style="text-align:center">Compte utilisateur</h5>
    </div>

    <div class="row">
      <form @submit.prevent="changeUuid">
        <p>L'identifiant ci-dessous vous permet de retrouver vos données <em>Revizoodle</em> sur un autre appareil.
        Pour cela, il vous suffit de copier l'identifiant associé à vos données, de le copier sur le nouvel appareil,
        et de cliquer sur "Modifier".</p>

        <label for="uuid">Identifiant :</label>
        <input class="u-full-width"
               type="text"
               placeholder="Identifiant Revizoodle..."
               id="uuid"
               v-model="uuid">

        <div class="vue" v-if="errorUuid">
          <p><em>Cet identifiant est incorrect</em></p>
        </div>

        <button class="button-success u-full-width" type="submit">Modifier</button>

        <div class="vue" v-if="updateUuidSuccessful">
          <p><em>Votre identifiant a été mis à jour.</em></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {validate as uuidValidate} from 'uuid';
import http from '@/http-commons';

export default {
  name: 'UuidView',
  data() {
    return {
      uuid: "",
      updateUuidSuccessful: false,
      errorUuid: false,
    }
  },
  created() {
    this.uuid = this.$cookies.get('uuid');
  },
  methods: {
    changeUuid() {
      if(uuidValidate(this.uuid)) {
        // TODO Move to a dedicated service
        this.$cookies.set('uuid', this.uuid, Infinity)
        http.defaults.headers.uuid = this.$cookies.get('uuid');
        this.errorUuid = false;
        this.updateUuidSuccessful = true;
      }
      else {
        this.errorUuid = true;
      }
    },
  }
};
</script>

<style scoped>

</style>