import http from '../http-commons';
import {validate as uuidValidate} from 'uuid';

class UserService {

  cookie = null;

  getUUID($cookies) {
    return $cookies.get('uuid');
  }

  changeUuid(uuid, $cookies) {
    if (uuidValidate(uuid)) {
      $cookies.set('uuid', uuid, Infinity);
      http.defaults.headers.uuid = $cookies.get('uuid');
      return true;
    }

    return false;
  }

  saveTeacherTocken(teacherTocken, $cookies) {
    $cookies.set('teacherToken', teacherTocken, Infinity);
    http.defaults.headers.teachertoken = $cookies.get('teacherToken');
  }

  isTeacher($cookies) {
    return !!$cookies.get('teacherToken');
  }

  checkIsTeacherOnServer() {
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