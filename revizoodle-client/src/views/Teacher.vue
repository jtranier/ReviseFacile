<template>
  <classroom-list :value="classroomList" v-on:create-classroom="createClassroom" />
</template>

<script>
import ClassroomList from '@/views/classroom/ClassroomList';
import moment from 'moment';

export default {
  name: 'Teacher',
  components: { 'classroom-list': ClassroomList },
  data: () => ({
    idSeq: 3,
    classroomList: [
      {
        id: 1,
        name: '1S1',
        date: moment("01/09/2020", "DD/MM/YYYY").toDate(),
      },
      {
        id: 2,
        name: 'Terminale L',
        date: moment("13/01/2021", "DD/MM/YYYY").toDate(),
      },

    ],
  }),
  methods: {
    createClassroom: function(name) {
      this.classroomList.push({
        id: this.idSeq++,
        name: name,
        date: new Date()
      })
    }
  }
};
</script>

<style scoped>

</style>