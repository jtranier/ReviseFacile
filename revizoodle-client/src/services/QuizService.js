import http from '../http-commons';
import moment from 'moment';

class QuizService {
  get(id) {
    return http.get(`/moodle-quiz/${id}`);
  }

  findAllMyQuiz() {
    return new Promise((resolve, reject) =>
        http.get(`/moodle-quiz`).then(res => {
          resolve(
              res.data.map(quiz => {
                return {
                  ...quiz,
                  date: moment(quiz.date).toDate(),
                };
              }),
          );
        }).catch(error => {
          reject(error);
        }),
    );
  }
}

export default new QuizService();