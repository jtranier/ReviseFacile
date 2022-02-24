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
  <div class="container" style="margin-top: 1em">

    <div style="margin-top: 3%;">
      <router-link :to="{ name: 'CourseAddQuizAction', params: { courseId } }"
                   custom
                   v-slot="{ navigate }">
        <div class="bouton-retour" @click="navigate">
          <h5>&lt;</h5>
        </div>

      </router-link>

      <h5 style="text-align:center">Importer un quiz Moodle</h5>
    </div>

    <div class="row">

      <form @submit="upload">

        <input type="file"
               style="display: none;"
               ref="xmlFile"
               name="xmlFile"
               @change="onFilePicked"/>

        <template v-if="showForm">
          <label for="inputQuizName">Nom :</label>
          <input class="u-full-width"
                 type="text"
                 placeholder="1A Phys1 S1"
                 id="inputQuizName"
                 v-model="quizName"/>

          <button type="submit"
                  class="button-primary"
                  :disabled="xmlFile === null">
            Importer
          </button>
        </template>
      </form>
    </div>

  </div>
</template>

<script>
import http from '../../http-commons';

export default {
  name: 'MoodleQuizUploadForm',
  data() {
    return {
      'quizName': '',
      'xmlFileDataUrl': null,
      'xmlFile': null,
      showForm: false,
      courseId: null, // defined when the quiz is imported for a specific course
    };
  },
  created() {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId;
    }
  },
  mounted() {
    this.pickFile();
  },
  methods: {
    pickFile() {
      this.$refs.xmlFile.click();
    },
    upload(e) {
      e.preventDefault();
      if (!this.xmlFile) {
        return false;
      }

      const formData = new FormData();
      formData.append('xmlFile', this.xmlFile);  // appending file
      formData.append('quizName', this.quizName);

      // sending file to the backend
      http.post('xml/upload', formData).then(res => {
        if (res.data.success) {
          if (this.courseId) {
            this.$router.push(`/teacher/course/${this.courseId}/add-quiz-action`);
          } else {
            this.$router.push('/teacher/quiz');
          }
        } else {
          alert('Le quiz n\'a pas pu être importé');
          console.err(res.data.error);
        }
      }).catch(console.error);
    },

    onFilePicked(e) {
      const files = e.target.files;
      let filename = files[0].name;

      // Filename without extension
      this.quizName = filename.replace(/\.[^/.]+$/, '');

      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.xmlFileDataUrl = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);

      this.xmlFile = files[0];
      this.showForm = true;
    },
  },
};
</script>

<style scoped>

</style>