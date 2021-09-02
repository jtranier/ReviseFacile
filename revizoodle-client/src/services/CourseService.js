import http from '../http-commons';

class CourseService {

  findAllMyCourse() {
    return http.get(`/course`);
  }

  create(name) {
    const formData = new FormData();
    formData.append('name', name);  // appending file
    return http.post('/course', formData).then(res => {
      return res.data;
    }).catch(error => {
      console.log(error);
    });
  }
}

export default new CourseService();