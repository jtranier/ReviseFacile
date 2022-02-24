<!--
  - Copyright Toulouse INP - inp@toulouse-inp.fr - 22/02/2022
  -
  - contributor(s) :
  -  Jean-François Parmentier (jean-francois.parmentier@toulouse-inp.fr)
  -  John Tranier (john.tranier@ticetime.com)
  -
  - This software is governed by the CeCILL-B license under French law and
  - abiding by the rules of distribution of free software.  You can  use,
  - modify and/ or redistribute the software under the terms of the CeCILL-B
  - license as circulated by CEA, CNRS and INRIA at the following URL
  - "http://www.cecill.info".
  -
  - As a counterpart to the access to the source code and  rights to copy,
  - modify and redistribute granted by the license, users are provided only
  - with a limited warranty  and the software's author,  the holder of the
  - economic rights,  and the successive licensors  have only  limited
  - liability.
  -
  - In this respect, the user's attention is drawn to the risks associated
  - with loading,  using,  modifying and/or developing or reproducing the
  - software by the user in light of its specific status of free software,
  - that may mean  that it is complicated to manipulate,  and  that  also
  - therefore means  that it is reserved for developers  and  experienced
  - professionals having in-depth computer knowledge. Users are therefore
  - encouraged to load and test the software's suitability as regards their
  - requirements in conditions enabling the security of their systems and/or
  - data to be ensured and,  more generally, to use and operate it in the
  - same conditions as regards security.
  -
  - The fact that you are presently reading this means that you have had
  - knowledge of the CeCILL-B license and that you accept its terms.
  -->

<template>
  <div class="container" style="margin-top: 1em">


    <div class="row">
      <div class="two-thirds column">
        <router-link to="/"
                     custom
                     v-slot="{ navigate }">
          <div class="bouton-retour" @click="navigate">
            <h5>&lt;</h5>
          </div>

        </router-link>
        <h4 style="margin-bottom: 1em; margin-left: 1em;">Mes cours</h4>
      </div>
      <div class="one-third column">
        <button class="button-primary u-full-width"
                v-on:click="showCreateForm"
                v-show="!createFormVisible">
          Créer
        </button>
      </div>
    </div>

    <course-create-form v-show="createFormVisible"
                        @hide="hideCreateForm"
                        v-on:create-course="createCourse"/>

    <template v-if="!sortedCourseList || !sortedCourseList.length">
      <p>Vous n'avez créé aucun cours.</p>
    </template>

    <template v-if="sortedCourseList && sortedCourseList.length">
      <hr/>
      <table class="u-full-width">
        <tbody>

        <course-list-item v-for="course in sortedCourseList"
                          v-bind:key="'course-'+course.id"
                          :name="course.name"
                          :id="course.id"
                          :date="course.date"></course-list-item>
        </tbody>
      </table>

      <hr/>
    </template>

  </div>

</template>


<script>
import CourseListItem from '@/views/course/CourseListItem';
import CourseCreateForm from '@/views/course/CourseCreateForm';

export default {
  name: 'teacher-course-list',
  components: {
    'course-create-form': CourseCreateForm,
    'course-list-item': CourseListItem,
  },
  data() {
    return {
      'createFormVisible': false,
    };
  },
  props: {value: Array}, // List of courses {id, name, date}
  computed: {
    sortedCourseList: function() {
      return this.value.slice().sort((a, b) => b.updatedAt - a.updatedAt);
    },
  },
  methods: {
    showCreateForm: function() {
      this.createFormVisible = true;
    },
    hideCreateForm: function() {
      this.createFormVisible = false;
    },
    createCourse(name) {
      this.$emit('create-course', name);
    },
  },
};
</script>

<style scoped>

</style>