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

  <div>

    <quiz-list-item v-for="quiz in sortedQuizList"
                    v-bind:key="'quiz'+quiz.id"
                    v-on:add-quiz-to-course="addQuizToCourse"
                    :courseId="courseId"
                    :id="quiz.id"
                    :name="quiz.name"
                    :date="quiz.date"
                    :nb-questions="quiz.nbQuestions"
                    :mode-add-quiz="modeAddQuiz" />

    <hr>
  </div>

</template>


<script>
import QuizListItem from '@/views/quiz/QuizListItem';

export default {
  name: 'quiz-list',
  components: {
    'quiz-list-item': QuizListItem,
  },
  props: {
    courseId: {
      type: [Number, String],
      default: null,
    },
    'quiz-list': Array, // List of quiz {id, name, date, nbQuestions}
    'modeAddQuiz': {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    sortedQuizList() {
      return this.quizList.slice().sort((a, b) => b.date - a.date);
    },
  },
  methods: {
    addQuizToCourse(quizId) {
      this.$emit('add-quiz-to-course', quizId);
    },
  },
};
</script>

<style scoped>

</style>