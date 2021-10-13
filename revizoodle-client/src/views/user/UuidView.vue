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

        <div v-if="errorUuid">
          <p><em>Cet identifiant est incorrect</em></p>
        </div>

        <button class="button-success u-full-width" type="submit">Modifier</button>

        <div v-if="updateUuidSuccessful">
          <p><em>Votre identifiant a été mis à jour.</em></p>
        </div>
      </form>
    </div>

    <div class="row">
      <strong>Rôle</strong> : {{ isTeacher ? 'Enseignant' : 'Étudiant' }}
      <button class="u-pull-right"
              v-if="isTeacher === false"
              @click="showTeacherAccessForm">Accès enseignant
      </button>
    </div>

    <div class="row" style="margin-top: 3em;" v-if="teacherAccessFormVisible">
      <form @submit.prevent="requestTeacherAccess">
        <label for="teacherPassword">Mot de passe :</label>
        <input type="password"
               autocomplete="current-password"
               class="u-full-width"
               placeholder="Mot de passe enseignant"
               id="teacherPassword"
               v-model="teacherPassword">

        <div v-if="teacherAccessFormErrorMessage !== null">
          <p><em>{{ teacherAccessFormErrorMessage }}</em></p>
        </div>

        <button class="button-primary u-full-width"
                type="submit">Soumettre
        </button>
      </form>
    </div>

  </div>
</template>

<script>
import {validate as uuidValidate} from 'uuid';
import http from '@/http-commons';
import UserService from '@/services/UserService';

export default {
  name: 'UuidView',
  data() {
    return {
      uuid: '',
      updateUuidSuccessful: false,
      errorUuid: false,
      isTeacher: null,
      teacherPassword: '',
      teacherAccessFormVisible: false,
      teacherAccessFormErrorMessage: null,
    };
  },
  created() {
    this.uuid = this.$cookies.get('uuid');
    UserService.isTeacher().then(isTeacher => {
      this.isTeacher = isTeacher;
    }).catch(console.error);
  },
  computed: {
    roleLabel() {
      switch (this.isTeacher) {
        case null: return '-';
        case false: return 'Étudiant';
        case true: return 'Enseignant';
      }
    }
  },
  methods: {
    changeUuid() {
      if (uuidValidate(this.uuid)) {
        // TODO Move to a dedicated service
        this.$cookies.set('uuid', this.uuid, Infinity);
        http.defaults.headers.uuid = this.$cookies.get('uuid');
        this.errorUuid = false;
        this.updateUuidSuccessful = true;
        this.isTeacher = null;
        UserService.isTeacher().then(isTeacher => {
          this.isTeacher = isTeacher;
        }).catch(console.error)
      } else {
        this.errorUuid = true;
      }
    },
    showTeacherAccessForm() {
      this.teacherAccessFormVisible = true;
    },
    requestTeacherAccess() {
      this.teacherAccessFormErrorMessage = null;

      UserService.requestTeacherAccess(this.teacherPassword).then(response => {
        // TODO Move to a dedicated service
        this.$cookies.set('teacherToken', response.data.teacherToken, Infinity);
        http.defaults.headers.teachertoken = this.$cookies.get('teacherToken');
        this.isTeacher = true;
        this.teacherAccessFormVisible = false;
      })
      .catch(error => {
        if(error.response) {
          this.teacherAccessFormErrorMessage = error.response.data.error.message;
        }
        else {
          this.teacherAccessFormErrorMessage = "L'opération n'a pas pu aboutir pour une raison inconnue. Veuillez réessayer."
        }

      });


    },
  },
};
</script>

<style scoped>

</style>