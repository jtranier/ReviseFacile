<template>
  <div class="container" align="justify" style="margin-top: 1em">
    <div class="row">
      <div class="two-thirds column">
        <h4 style="margin-bottom: 1em">Mes cours</h4>
      </div>
      <!--      TODO: activate this code when import function is implemented -->
      <!--      <div class="one-third column">-->
      <!--        <button class="button-primary u-full-width">Importer</button>-->
      <!--      </div>-->
    </div>

    <template v-if="!sortedClassroomList || !sortedClassroomList.length">
          <p>Vous n'avez créé aucune classe.</p>
    </template>

    <template v-if="sortedClassroomList && sortedClassroomList.length">
    <hr/>
    <table class="u-full-width">
      <tbody>

      <classroom-index v-for="classRoom in sortedClassroomList"
                       v-bind:key="'classroom-'+classRoom.id"
                       :name="classRoom.name"
                       :id="classRoom.id"
                       :date="classRoom.date"></classroom-index>
      </tbody>
    </table>

    <hr/>
    </template>

  </div>

</template>


<script>
import ClassroomIndex from '@/views/classroom/ClassroomIndex';

export default {
  name: 'classroom-list',
  components: {
    'classroom-index': ClassroomIndex,
  },
  props: { value: Array }, // List of classrooms {id, name, date}
  computed: {
    sortedClassroomList: function() {
      return this.value.slice().sort((a, b) => b.date - a.date);
    },
  }
};
</script>

<style scoped>

</style>