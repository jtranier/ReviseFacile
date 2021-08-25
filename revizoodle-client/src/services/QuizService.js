import http from '../http-commons';

class QuizService {
  get(id) {
    return http.get(`/moodle-quiz/${id}`)
  }
}

export default new QuizService();