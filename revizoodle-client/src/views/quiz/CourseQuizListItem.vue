<template>
  <div>

    <table class="u-full-width">
      <tbody>
      <tr>
        <th>{{ name }}</th>
        <td style="text-align: right;"></td>
      </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="two-thirds column">
        <table class="u-full-width">
          <tbody>
          <tr>
            <td>{{ moment(date).format('L') }}</td>
            <td>{{ nbQuestions }} questions</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="one-third column">
        <router-link :to="{name: 'QuizResultsView', params: { courseId: courseId, quizId:quizId }}" custom v-slot="{ navigate }">
          <button class="u-full-width"
                  @click="navigate">
            Résultats
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'course-quiz-list-item',
  props: {
    quizId: {
      type: [Number, String],
      required: true,
    },
    courseId: {
      type: [Number, String],
      required: true,
    },
    name: String,
    date: Date,
    nbQuestions: Number,
  },
  methods: {moment},
};
</script>

<style scoped>

</style>