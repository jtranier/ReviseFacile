const uuidv4 = require('uuid');
const CryptoJs = require('crypto-js');
const userConfig = require('../config/user.config.js');

class AuthenticationService {

  isAuthenticated(req) {
    return uuidv4.validate(req.headers.uuid);
  }

  isTeacher(req) {
    const uuid = req.headers.uuid;
    const teacherToken = req.headers.teachertoken;

    if(!teacherToken) {
      return false;
    }

    const bytes  = CryptoJs.AES.decrypt(teacherToken, userConfig.secretKey);

    return uuid === bytes.toString(CryptoJs.enc.Utf8);
  }

  getUUID(req) {
    return req.headers.uuid;
  }
}

module.exports = new AuthenticationService();