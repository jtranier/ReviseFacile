<template>
  <router-link :to="{ name: 'LearnerCourseView', params: { courseId: id } }" custom v-slot="{ navigate }">
    <tr @click="navigate" style="cursor: pointer">
      <th>{{ name }}</th>
      <td style="text-align: right;">{{ moment(date).format('L') }}</td>
      <td style="text-align: right;">
        <router-link class="bouton-avance" :to="{ name: 'LearnerCourseView', params: { courseId: id } }">&gt;
        </router-link>
      </td>
    </tr>
  </router-link>
</template>

<script>
import moment from 'moment';

export default {
  name: 'learner-course-list-item',
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