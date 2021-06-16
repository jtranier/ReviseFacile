<template>
  <div class="container" align="justify" style="margin-top: 1em">
    <div class="row">
      <div class="two-thirds column">
        <h4 style="margin-bottom: 1em">Mes classes</h4>
      </div>
      <div class="one-third column">
        <button class="button-primary u-full-width" v-on:click="showCreateForm">Créer</button>
      </div>
    </div>

    <classroom-create-form v-show="createFormVisible"
                           @hide="hideCreateForm"
                           v-on:create-classroom="createClassroom" />

    <template v-if="!sortedClassroomList || !sortedClassroomList.length">
      <p>Vous n'avez créé aucune classe.</p>
    </template>

    <template v-if="sortedClassroomList && sortedClassroomList.length">
      <hr/>
      <table class="u-full-width">
        <tbody>

        <classroom-list-item v-for="classRoom in sortedClassroomList"
                             v-bind:key="'classroom-'+classRoom.id"
                             :name="classRoom.name"
                             :id="classRoom.id"
                             :date="classRoom.date"></classroom-list-item>
        </tbody>
      </table>

      <hr/>
    </template>

  </div>

</template>


<script>
import ClassroomListItem from '@/views/classroom/ClassroomListItem';
import ClassroomCreateForm from '@/views/classroom/ClassroomCreateForm';

export default {
  name: 'classroom-list',
  components: {
    'classroom-create-form': ClassroomCreateForm,
    'classroom-list-item': ClassroomListItem,
  },
  data() {
    return {
      'createFormVisible': false,
    };
  },
  props: {value: Array}, // List of classrooms {id, name, date}
  computed: {
    sortedClassroomList: function() {
      return this.value.slice().sort((a, b) => b.date - a.date);
    },
  },
  methods: {
    showCreateForm: function() {
      this.createFormVisible = true;
    },
    hideCreateForm: function() {
      this.createFormVisible = false;
    },
    createClassroom(name) {
      this.$emit('create-classroom', name)
    }
  },
};
</script>

<style scoped>

</style>