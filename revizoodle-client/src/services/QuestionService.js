class QuestionService {
  convertLegacyFormat(legacyJsonQuestion) {

    return {
      "id": legacyJsonQuestion.id,
      "statement": legacyJsonQuestion.enonce,
      "explanation": legacyJsonQuestion.explication,
      "correctAnswerIndex": legacyJsonQuestion.bonneReponse,
      "answerList": legacyJsonQuestion.reponses,
      "feedbackList": legacyJsonQuestion.feedbacks,
      "hint": legacyJsonQuestion.aide,
    }
  }
}

export default new QuestionService()