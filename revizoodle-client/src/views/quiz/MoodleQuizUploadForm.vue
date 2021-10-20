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

      this.quizName = filename;

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