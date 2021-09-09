import http from '../http-commons';

class CourseService {

  get(courseId) {
    return http.get(`/course/${courseId}`);
  }

  findAllMyCourse() {
    return http.get(`/course`);
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