<template>
  <tr>
  <th>{{ name }}</th>
    <td style="text-align: right;">{{ moment(date).format('L') }}</td>
    <td style="text-align: right;"><router-link class="bouton-avance" to="/teacher/classroom/123">&gt;</router-link></td>
  </tr>
</template>

<script>
import moment from 'moment'


export default {
  name: 'classroom-list-item',
  props: {
    id: Number,
    name: String,
    date: Date
  },
  methods: { moment }
};
</script>

<style scoped>

</style>