<template>
  <div>
    <hr>
    <table class="u-full-width">
      <tbody>
      <tr>
        <th>{{ name }}</th>
        <td style="text-align: right;"><a
            onclick="alert('TODO');"
            href="TODO"
            style="text-decoration: none;">Lien apprenant</a></td>
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
        <button class="u-full-width"
                onclick="alert('TODO');">
          Résultats
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'


export default {
  name: 'course-quiz-list-item',
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    name: String,
    date: Date,
    nbQuestions: Number
  },
  methods: { moment }
};
</script>

<style scoped>

</style>