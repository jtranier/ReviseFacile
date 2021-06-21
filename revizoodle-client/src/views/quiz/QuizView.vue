<template>

  <div class="container" align="justify">
    <h5 style="text-align:center">Question {{currentQuestionIndex}} / {{ nbQuestions }}</h5>
    <question v-bind="currentQuestion"/>

    <div style="margin-top: 3%;" >
      <div class="row">
        <div class="one-half column"><router-link :to="'/teacher/quiz/'+quizId+'/question/'+previousIndex" tag="button" class="u-full-width"> &lt; </router-link></div>
        <div class="one-half column"><router-link :to="'/teacher/quiz/'+quizId+'/question/'+nextIndex" tag="button" class="u-full-width"> &gt; </router-link></div>
      </div>
    </div>
  </div>

</template>

<script>
import Question from '@/views/quiz/Question';

export default {
  name: 'quiz-view',
  components: {Question},
  props: {
    quizId: String,
    questionIndex: String
  },
  data() {
    return {
      quiz: [],
    };
  },
  created() {
    this.quiz = [
      {"id":31,"statement":"<p>Donnez la réponse la plus précise possible.</p><p>La suite $u$ définie pour tout entier $n$ par $u_n = (-1)^n$ est:</p>","explanation":"<p>Cette suite est&nbsp;majorée part tout nombre supérieur ou égal à $1$ et&nbsp;minorée par tout nombre inférieur ou égal à $-1$. Elle est donc bornée.</p>","correctAnswerIndex":3,"answerList":["majorée","minorée","bornée","aucun des trois"],"feedbackList":["<p>oui tout à fait mais elle est aussi minorée par tout nombre inférieur ou égal à $-1$</p>","<p>oui tout à fait mais elle est aussi majorée part tout nombre supérieur ou égal à $1$</p>","","<p>On peut commencer par remarquer que $\\forall n\\in\\mathbb{N},~u_n \\leq 1$, autrement dit $u_n$ est au moins majorée...</p>"],"hint":"<p>Je vous proposer de représenter graphiquement les 10 premiers termes de cette suite.</p>"},
      {"id":6,"statement":"<p>En physique, on relie l'énergie au repose d'une particule, $E$, à sa masse $m$ par une relation de proportionalité</p><p>$$E=\\text{constante}\\times m$$</p><p>Quelle est l'unité de la constante ?</p>","explanation":"<p>L'énergie s'exprime en Joule (J) et la masse en kg. Or, la constante s'écrit $\\text{constante}=E/m$, donc son unité est le J/kg ou J.kg$^{-1}$. Il se trouve que cette unité est la même que des m$^2$.s$^{-2}$, c'est-à-dire une vitesse au carré. En effet, on sait que cette constante est le carré de la vitesse de la lumière.</p>","correctAnswerIndex":3,"answerList":["J","J.kg","J.kg$^{-1}$","sans unité","aucune des réponses précédentes n'est correcte"],"feedbackList":["<p>Le Joule (J) est une unité d'énergie.</p>","<p>Attention aux manipulations algébriques quand tu exprimes la constante en fonction de $E$ et de $m$ pour trouver sa dimension.</p>","","<p>Une constante peut avoir une dimension.</p>","<p>Attention si tu penses que l'unité est le carré d'une vitesse, donc m$^2$.s$^{-2}$, cette unité est la même qu'une des unités proposées plus haut.</p>"],"hint":""},
      {"id":23,"statement":"<p>La loi du déplacement de Wien dit que</p><p>$$\\lambda_{\\text{max}}=\\frac{\\text{constante}}{T}$$&nbsp; </p><p><img src=\"https://jfparmentier.fr/question_pictures/3/3d8c847.png\" class=\"u-max-full-width\"></p><p>Quelle est l'unité de la constante ?</p>","explanation":"<p>La constante s'écrit $\\text{constante}=\\lambda\\,T$, donc l'unité dans le système international est le mètre Kelvin, m.K.</p>","correctAnswerIndex":2,"answerList":["m/K","m.K","K/m","Sans dimension."],"feedbackList":["<p>Commence par exprimer la constante en fonction de $\\lambda$ et $T$.</p>","","","<p>Une constante <strong>peut</strong> avoir une dimension.</p>"],"hint":"<p>Écris que l'équation doit être homogène.</p>"},
      {"id":1022,"statement":"<p>Un moustique s'écrase sur la vitre d'un TGV. Que dire de la force exercée par la vitre sur le moustique, par rapport à la force exercée par le moustique sur la vitre ?</p>","explanation":"","correctAnswerIndex":2,"answerList":["la force exercée par la vitre est plus grande","elles sont égales en norme","la force exercée par le moustique est plus grande"],"feedbackList":["","",""],"hint":""},
      {"id":953,"statement":"<p>Une grandeur $a$ est reliée à une grandeur $b$ par la relation&nbsp;</p><p>$$a(x)=\\int_{0}^{x}b(x)\\text{d}&nbsp;x$$</p><p>où $x$ représente une longueur. Que dire des dimensions de $a$ et $b$?</p>","explanation":"","correctAnswerIndex":3,"answerList":["$[a]=[b]$","$[a]=[b]=1$","$[a]=[b]L$","$[a]=[b]L^{-1}$"],"feedbackList":["","","",""],"hint":""},
      {"id":887,"statement":"<p>On considère la fronde de la figure ci-dessous.</p><p><img src=\"https://jfparmentier.fr/question_pictures/3/31383edc7.png\" class=\"u-max-full-width\"></p><p>Le travail de la tension de la corde est</p>","explanation":"<p>Le mouvement de la masse $m$ est circulaire. La tension de la corde est radiale, donc le déplacement est perpendiculaire à la tension, le travail élémentaire est donc nul. Ainsi, le travail est toujours nul, quelque soit l'angle balayé par la masse $m$.</p>","correctAnswerIndex":3,"answerList":["positif","nul sur un tour complet et non nul sur un demi-tour","toujours nul","négatif"],"feedbackList":["","","",""],"hint":""}
    ];
  },
  computed: {
    currentQuestionIndex: function() {
      return Math.max(
          Math.min(this.questionIndex, this.nbQuestions),
          1
      )
    },
    currentQuestion: function() {
      if(this.quiz && this.quiz.length) {
        return this.quiz[this.currentQuestionIndex - 1];
      }
      else return null
    },
    nbQuestions: function() {
      return this.quiz ? this.quiz.length : 0;
    },
    previousIndex: function() {
      return Math.max( this.currentQuestionIndex - 1, 1);
    },
    nextIndex: function() {
      return Math.min( this.currentQuestionIndex + 1, this.nbQuestions);
    },
  },
};
</script>

<style scoped>

</style>