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

      <div class="one-third column" v-if="addToCourseId === -1">&nbsp;</div>

      <div class="one-third column">
        <router-link :to="'/teacher/quiz/'+id" tag="button" class="u-full-width">Voir</router-link>
      </div>
      <div class="one-third column" v-if="addToCourseId !== -1">
        <button class="u-full-width" >Choisir</button>
      </div>
    </div>

  </div>


</template>

<script>
import moment from 'moment'


export default {
  name: 'quiz-list-item',
  props: {
    id: Number,
    name: String,
    date: Date,
    nbQuestions: Number,
    addToCourseId: {
      type: Number,
      default: -1
    }
  },
  methods: { moment }
};
</script>

<style scoped>

</style>