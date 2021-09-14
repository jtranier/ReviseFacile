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
}

export default new TrainingService();