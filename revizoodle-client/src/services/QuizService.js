import http from '../http-commons';

class QuizService {
  get(id) {
    return http.get(`/moodle-quiz/${id}`)
  }

  findAllMyQuiz() {
    return http.get(`/moodle-quiz`)
  }
}

export default new QuizService();