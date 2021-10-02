<template>
  <router-link :to="'/teacher/course/'+id" custom v-slot="{ navigate }">
    <tr @click="navigate" style="cursor: pointer">
      <th>

        {{ name }}
      </th>
      <td style="text-align: right;">{{ moment(date).format('L') }}</td>
      <td style="text-align: right;">
        <router-link class="bouton-avance" :to="'/teacher/course/'+id">&gt;</router-link>
      </td>
    </tr>
  </router-link>
</template>

<script>
import moment from 'moment';

export default {
  name: 'course-list-item',
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    name: String,
    date: Date,
  },
  methods: {moment},
};
</script>

<style scoped>

</style>