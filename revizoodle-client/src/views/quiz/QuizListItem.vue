<template>
  <div>
    <hr>
    <table class="u-full-width">
      <tbody>
      <tr>
        <th>{{ name }}</th>
      </tr>
      </tbody>
    </table>


    <div class="row">
      <div class="one-third column"><p style="text-align: center;">{{ nbQuestions }} questions</p></div>

      <div class="one-third column" v-if="!modeAddQuiz">&nbsp;</div>

      <div class="one-third column">
        <router-link :to="quizLink"
                     custom v-slot="{ navigate }">
          <button class="u-full-width" @click="navigate">
            Voir
          </button>
        </router-link>
      </div>
      <div class="one-third column" v-if="modeAddQuiz">
        <button class="button-primary u-full-width" v-on:click="addQuizToCourse">Choisir</button>
      </div>
    </div>

  </div>


</template>

<script>
import moment from 'moment'


export default {
  name: 'quiz-list-item',
  props: {
    courseId: {
      type: [Number, String],
      default: null,
    },
    id: Number,
    name: String,
    date: Date,
    nbQuestions: Number,
    modeAddQuiz: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    moment,
    addQuizToCourse() {
      this.$emit('add-quiz-to-course', this.id);
    }
  },
  computed: {
    quizLink() {
      return this.courseId === null ?
          `/teacher/quiz/${this.id}` :
          `/teacher/course/${this.courseId}/quiz/${this.id}`

    }
  }
};
</script>

<style scoped>

</style>