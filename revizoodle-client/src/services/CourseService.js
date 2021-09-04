import http from '../http-commons';
import moment from 'moment';

class CourseService {

  get(courseId) {
    return http.get(`/course/${courseId}`);
  }

  findAllMyCourse() { // for teacher
    return http.get(`/course`);
  }

  findAllMyRegisteredCourse() { // for learner
    return new Promise((resolve, reject) => {
      return http.get(`/learner/course`).then(res => {
        resolve(
            res.data.map(course => {
              return {
                ...course,
                date: moment(course.date).toDate()
              }
            })
        );
      }).catch(error => {
        reject(error);
      });
    });
  }

  create(name) {
    const formData = new FormData();
    formData.append('name', name);
    return http.post('/course', formData)
    .then(res => {
      return res.data;
    }).catch(error => {
      console.error(error);
    });
  }

  addQuiz(courseId, quizId) {
    const formData = new FormData();
    formData.append('quizId', quizId);
    return http.post(`/course/${courseId}/add-quiz`, formData)
    .then(() => {
      return {
        success: true
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
}

export default new CourseService();