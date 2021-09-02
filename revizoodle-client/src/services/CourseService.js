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
    formData.append('name', name);  // appending file
    return http.post('/course', formData).then(res => {
      return res.data;
    }).catch(error => {
      console.error(error);
    });
  }
}

export default new CourseService();