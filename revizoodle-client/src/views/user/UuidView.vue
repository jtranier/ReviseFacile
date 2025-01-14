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
  <div class="container">
    <div style="margin-top: 3%;">
      <div class="bouton-retour" @click="$router.go(-1)">
        <h5>&lt;</h5>
      </div>

      <h5 style="text-align:center">Compte utilisateur</h5>
    </div>

    <div class="row" v-if="needTeacherAccess">
      <p>Vous essayer d'accéder à une page qui requiert le rôle "Enseignant".</p>
    </div>

    <div class="row">
      <p>
        <strong>Rôle</strong> : {{ isTeacher ? 'Enseignant' : 'Étudiant' }}
        <span v-if="isTeacher === false">(<a href="#" @click.prevent="showTeacherAccessForm">changer de rôle</a>)</span>
      </p>
    </div>

    <div class="row" v-if="teacherAccessFormVisible">
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

    <div class="row">
      <form @submit.prevent="changeUuid">
        <p>L'identifiant ci-dessous vous permet de retrouver vos données <em>Revizoodle</em> sur un autre appareil.
          Pour cela, il vous suffit de copier celui-ci dans votre deuxième appareil (ou de recopier celui de
          votre deuxième appareil à la place de celui-ci), puis de cliquer sur le bouton Modifier.</p>

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

  </div>
</template>

<script>
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
      needTeacherAccess: false,
    };
  },
  created() {
    this.uuid = this.$cookies.get('uuid');
    this.isTeacher = UserService.isTeacher(this.$cookies);
    this.needTeacherAccess = !!this.$route.query.needTeacherAccess;
  },
  computed: {
    roleLabel() {
      if (this.isTeacher === null) return '-';
      else return this.isTeacher ? 'Enseignant' : 'Étudiant';
    },
  },
  methods: {
    changeUuid() {
      if (UserService.changeUuid(this.uuid, this.$cookies)) {
        this.errorUuid = false;
        this.updateUuidSuccessful = true;
        this.isTeacher = null;
        this.isTeacher = UserService.isTeacher(this.$cookies);
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
        UserService.saveTeacherTocken(response.data.teacherToken, this.$cookies);
        this.isTeacher = true;
        this.teacherAccessFormVisible = false;
      }).catch(error => {
        if (error.response) {
          this.teacherAccessFormErrorMessage = error.response.data.error.message;
        } else {
          this.teacherAccessFormErrorMessage = 'L\'opération n\'a pas pu aboutir pour une raison inconnue. Veuillez réessayer.';
        }

      });

    },
  },
};
</script>

<style scoped>

</style>