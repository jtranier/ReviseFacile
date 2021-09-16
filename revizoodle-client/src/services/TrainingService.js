import http from '@/http-commons';
import moment from 'moment';

class TrainingService {
  findAllMyRegisteredCourse() {
    return new Promise((resolve, reject) => {
      return http.get(`/learner/course`).then(res => {
        resolve(
            res.data.map(course => {
              return {
                ...course,
                date: moment(course.date).toDate(),
              };
            }),
        );
      }).catch(error => {
        reject(error);
      });
    });
  }

  findAllTrainingsForCourse(courseId) {
    return new Promise((resolve, reject) => {
      http.get(`/learner/course/${courseId}`).then(res => {
        resolve(
            res.data.map(quiz => {
              return {
                ...quiz,
                quizDate: moment(quiz.date).toDate(),
              };
            }),
        );
      }).catch(error => {
        reject(error);
      });
    });
  }

  updateLearnerAnswers(trainingId, questionIndex, learnerAnswers) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('questionIndex', questionIndex);
      formData.append('learnerAnswers', JSON.stringify(learnerAnswers));

      http.put(`/learner/training/${trainingId}`, formData)
      .then(resolve).catch(reject)
    })
  }

  updateScore(trainingId, score) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('score', score);

      http.put(`/learner/training/${trainingId}/score`, formData)
      .then(resolve).catch(reject)
    })
  }

  redoTraining(quizId) {
    return new Promise((resolve, reject) => {
      http.post(`/moodle-quiz/${quizId}/redo-training`)
          .then(resolve).catch(reject);
    });
  }
}

export default new TrainingService();