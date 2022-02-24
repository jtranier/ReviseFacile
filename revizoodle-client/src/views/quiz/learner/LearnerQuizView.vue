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
    <div class="container" v-if="state !== States.COMPLETED && currentQuestionIndex > 0">
      <div style="margin-top: 3%;">
        <router-link :to="{ name: 'LearnerCourseView', params: { courseId } }"
                     custom
                     v-slot="{ navigate }">
          <div class="bouton-retour" @click="navigate">
            <h5>&lt;</h5>
          </div>

        </router-link>

        <h5 style="text-align:center">Question {{ currentQuestionIndex }} / {{ nbQuestions }}</h5>
      </div>

      <learner-question v-bind="quiz.questions[currentQuestionIndex - 1]"
                        :index="currentQuestionIndex"
                        :learnerAnswer="quiz.learnerAnswers[currentQuestionIndex - 1]"
                        v-on:submitLearnerAnswer="submitLearnerAnswer"/>

      <div style="margin-top: 3%;" v-if="state === States.SUBMITTED && currentQuestionIndex < nbQuestions">
        <div class="row">
          <button class="button-primary u-full-width" @click="nextQuestion">Question suivante</button>
        </div>
      </div>

      <div style="margin-top: 3%;" v-if="state === States.SUBMITTED && currentQuestionIndex === nbQuestions">
        <div class="row">
          <button class="button-primary u-full-width" @click="finalizeTraining">Terminer</button>
        </div>
      </div>


    </div>
    <training-result v-if="state === States.COMPLETED"
                     :score="trainingScore"
                     :quiz-id="quizId" v-on:restart-training="startTraining"
                     :course-id="courseId"/>
  </div>


</template>

<script>
import LearnerQuestion from '@/views/quiz/learner/LearnerQuestion';
import QuizService from '@/services/QuizService';
import TrainingService from '@/services/TrainingService';
import TrainingResult from '@/views/training/TrainingResult';

const States = {
  LOADING: 'loading',
  ANSWERING: 'answering',
  SUBMITTING: 'submitting',
  SUBMITTED: 'submitted',
  COMPLETED: 'completed',
};

export default {
  name: 'learner-quiz-view',
  components: {LearnerQuestion, TrainingResult},
  props: {
    courseId: {
      type: [Number, String],
      default: null,
    },
    quizId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      trainingId: -1,
      trainingScore: -1,
      States,
      state: States.LOADING,
      quizTitle: '',
      questionIndex: {}, // map questionIndex to question
      learnerAnswerIndex: {}, // map questionIndex to answer
      quiz: {
        name: '',
        questions: [],
        learnerAnswers: {},
      },

      currentQuestionIndex: -1,
    };
  },
  created() {
    this.startTraining();
  },
  computed: {
    nbQuestions: function() {
      return this.quiz && this.quiz.questions ? this.quiz.questions.length : 0;
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.nbQuestions) {
        this.currentQuestionIndex++;
        this.state = States.ANSWERING;
        this.scrollToTop();
      }
    },
    submitLearnerAnswer() {
      this.state = States.SUBMITTING;

      TrainingService.updateLearnerAnswers(
          this.trainingId,
          this.currentQuestionIndex - 1,
          this.quiz.learnerAnswers,
      ).then(res => {
        this.state = States.SUBMITTED;
        this.quiz.learnerAnswers = res.data;
      }).catch(console.error);
    },
    finalizeTraining() {
      this.trainingScore = computeTrainingScore(this.quiz.learnerAnswers, this.quiz.questions.length);

      TrainingService.updateScore(
          this.trainingId,
          this.trainingScore,
      ).then(() => {
        this.state = States.COMPLETED;
      }).catch(console.error);
    },
    startTraining() {
      QuizService.getWithLastTraining(this.quizId).then(quiz => {

        this.state = States.ANSWERING;
        this.quiz = quiz;
        this.quizTitle = quiz.name;
        this.trainingId = quiz.trainingId;

        this.currentQuestionIndex = 1 + (
            // Look for the 1st question not answered
            this.quiz.learnerAnswers.findIndex(learnerAnswer => {
              return learnerAnswer.submitted === false;
            })
        );

        if (this.currentQuestionIndex === 0) {
          this.state = States.COMPLETED;
        }

      }).catch(console.error);
    },
  },
};

const computeTrainingScore = (learnerAnswers, nbQuestions) => {

  return Math.round(
      learnerAnswers.reduce((acc, learnerAnswer) => {
        return acc + learnerAnswer.score;
      }, 0) / nbQuestions,
  );
};
</script>

<style scoped>

</style>