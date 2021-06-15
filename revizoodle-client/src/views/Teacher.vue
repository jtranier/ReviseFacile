<template>
  <classroom-list :value="classroomList"/>
</template>

<script>
import ClassroomList from '@/views/classroom/ClassroomList';
import moment from 'moment';

export default {
  name: 'Teacher',
  components: { 'classroom-list': ClassroomList },
  data: () => ({
    classroomList: [
      {
        id: 1,
        name: 'Introduction mécanique L1',
        date: moment("01/09/2020", "DD/MM/YYYY").toDate(),
      },
      {
        id: 2,
        name: 'Aérodynamique',
        date: moment("13/01/2021", "DD/MM/YYYY").toDate(),
      },

    ],
  }),
};
</script>

<style scoped>

</style>