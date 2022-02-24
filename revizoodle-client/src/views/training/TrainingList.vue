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
    <training-list-item v-for="training in trainingList"
                        v-bind:key="`training-${training.quizId}`"
                        :course-id="courseId"
                        :quiz-id="training.quizId"
                        :quiz-title="training.quizTitle"
                        :quiz-date="training.quizDate"
                        :last-training-current-question="training.lastTrainingCurrentQuestion"
                        :quiz-nb-questions="training.quizNbQuestions"
                        :score="training.score" />

  </div>
</template>

<script>
import TrainingListItem from '@/views/training/TrainingListItem';

export default {
  name: 'TrainingList',
  components: {
    'training-list-item': TrainingListItem,
  },
  props: {
    courseId: [Number, String],
    'trainingList': Array,
  },
};
</script>

<style scoped>

</style>