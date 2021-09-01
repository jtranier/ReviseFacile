import http from '../http-commons';

class CourseService {

  findAllMyCourse() {
    return http.get(`/course`)
  }
}

export default new CourseService();