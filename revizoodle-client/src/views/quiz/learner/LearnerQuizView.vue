<template>

  <div>
    <div class="container" v-if="state !== States.COMPLETED && currentQuestionIndex > 0">
      <div style="margin-top: 3%;">
        <router-link :to="backRouterLink"
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
          <button class="button-primary u-full-width" @click="nextQuestion">Passer à la question suivante</button>
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
                     :quiz-id="quizId" v-on:restart-training="startTraining"/>
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
      backRouterLink: {
        name: 'LearnerView',
      },
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
        window.scrollTo(0,0);
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
            Object.keys(this.quiz.learnerAnswers).sort().findIndex(index => {
              return this.quiz.learnerAnswers[index].submitted === false;
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

  return Math.ceil(
      [...Array(nbQuestions)].reduce((acc, x, index) => {
        return acc + learnerAnswers[index].score;
      }, 0) / nbQuestions,
  );
};
</script>

<style scoped>

</style>