import http from '../http-commons';

class UserService {

  isTeacher() {
    return new Promise((resolve, reject) => {
      http.get('/user/is-teacher').then(response => {
        resolve(response.data.isTeacher);
      }).catch(reject);
    });

  }

  requestTeacherAccess(password) {
    const formData = new FormData();
    formData.append('password', password);
    return http.post(`/user/request-teacher-access`, formData);
  }
}

export default new UserService();