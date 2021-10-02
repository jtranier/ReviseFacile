import http from '../http-commons';
import moment from 'moment';

class QuizService {
  get(id) {
    return http.get(`/moodle-quiz/${id}`);
  }

  /**
   * Get a quiz, with the latest training data on this quiz for a learner
   * @param id
   */
  getWithLastTraining(id) {
    return new Promise((resolve, reject) => {
      http.get(`/moodle-quiz/${id}/latest-training`).then(res => {
        resolve(res.data)
      }).catch(reject);
    });
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

  getResults(id) {
    return new Promise((resolve, reject) => {
      http.get(`/moodle-quiz/${id}/results`).then(res => {
        resolve(res.data);
      }).catch(reject);
    });
  }
}

export default new QuizService();