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
        <router-link class="button button-primary u-full-width" to="/learner">Accès étudiant</router-link>
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